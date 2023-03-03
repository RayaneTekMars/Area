/* eslint-disable max-depth */
/* eslint-disable no-console */
import { Injectable } from '@nestjs/common'
import { Interval } from '@nestjs/schedule'
import { ServiceName } from 'src/common/types/service.type'
import { ScenariosService } from 'src/scenarios/scenarios.service'
import { TwitchSubscribeService } from 'src/subscriptions/services/twitch.sub.service'
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service'
import { TwitchService } from '../services/twitch.service'

@Injectable()
export class TwitchSchedule {
    subscriptions: string[]

    constructor(
        private readonly twitchService: TwitchService,
        private readonly scenariosService: ScenariosService,
        private readonly subscriptionsService: SubscriptionsService,
        private readonly twitchSubscribeService: TwitchSubscribeService
    ) {
        this.subscriptions = []
    }

    @Interval(60_000)
    async handleNewStreams() {
        console.log('Twitch: Checking for new streams...')
        const subs = await this.subscriptionsService.getSubscriptionsByServiceName(ServiceName.Twitch)
        console.log(`Twitch: Found ${subs.length} subscriptions`)
        this.subscriptions = this.subscriptions.filter((x) => subs.map((y) => y.account.id).includes(x))
        for await (const sub of subs) {
            const scenarios = await this.scenariosService.getScenariosByTrigger(sub.account.id, ServiceName.Twitch, 'NewStream')
            console.log(`Twitch: Found ${scenarios.length} scenarios for the user "${sub.account.username}"`)
            for await (const scenario of scenarios) {
                const streams = await this.twitchService.getStreams(sub.account.id, scenario, sub.accessToken)
                console.log('Twitch: Found new stream:', streams)
                if (this.subscriptions.includes(sub.account.id)) {
                    for (const stream of streams)
                        void this.twitchService.triggerNewStream(sub.account.id, scenario, stream)
                } else {
                    console.log('Twitch: New Subscription')
                    this.subscriptions.push(sub.account.id)
                }
            }
        }
    }

}
