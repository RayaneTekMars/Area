/* eslint-disable max-depth, no-console */
import { Injectable } from '@nestjs/common'
import { Interval } from '@nestjs/schedule'
import { ServiceName } from 'src/common/types/service.type'
import { ScenariosService } from 'src/scenarios/scenarios.service'
import { TwitchSubscribeService } from 'src/subscriptions/services/twitch.sub.service'
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service'
import { TwitchService } from '../services/twitch.service'

@Injectable()
export class TwitchSchedule {

    constructor(
        private readonly twitchService: TwitchService,
        private readonly scenariosService: ScenariosService,
        private readonly subscriptionsService: SubscriptionsService,
        private readonly twitchSubscribeService: TwitchSubscribeService
    ) {}

    @Interval(6000)
    async handleNewStreams() {
        console.log('Twitch: Checking for new streams...')
        const subs = await this.subscriptionsService.getSubscriptionsByServiceName(ServiceName.Twitch)
        console.log(`Twitch: Found ${subs.length} subscriptions`)
        for await (const sub of subs) {
            const scenarios = await this.scenariosService.getScenariosByTrigger(sub.account.id, ServiceName.Twitch, 'NewStream')
            console.log(`Twitch: Found ${scenarios.length} scenarios for "${sub.account.username}"`)
            for await (const scenario of scenarios) {
                const streams = await this.twitchService.getStreamOfUser(sub.account.id, scenario, sub.accessToken)
                console.log('Twitch: Found new stream:', streams)
                console.log(streams)
                for (const stream of streams)
                    void this.twitchService.triggerNewStream(sub.account.id, scenario, stream)
            }
        }
    }

    @Interval(1_800_000)
    async refreshAccessToken() {
        console.log('Twitch: Refreshing Twitch tokens...')
        const subs = await this.subscriptionsService.getSubscriptionsByServiceName(ServiceName.Twitch)
        console.log(`Twitch: Found ${subs.length} subscriptions`)
        for await (const sub of subs) {
            try {
                const { accessToken } = await this.twitchSubscribeService.refreshAccessToken(sub.refreshToken)
                void this.subscriptionsService.updateSubscription(ServiceName.Twitch, sub.account.id, accessToken, sub.refreshToken, sub.expiresAt)
            } catch {
                throw new Error('Twitch: Error refreshing access token')
            }
        }
    }

}
