/* eslint-disable no-console */
import { Injectable } from '@nestjs/common'
import { Interval } from '@nestjs/schedule'
import { TwitterService } from '../services/twitter.service'
import { ScenariosService } from '../scenarios.service'
import { SubscriptionsService } from '../../subscriptions/subscriptions.service'
import { ServiceName } from '../types/service.type'
import { TwitterSubscribeService } from '../../subscriptions/services/twitter.sub.service'

@Injectable()
export class TwitterSchedule {
    subscriptions: string[]

    constructor(
        private readonly twitterService: TwitterService,
        private readonly scenariosService: ScenariosService,
        private readonly subscriptionsService: SubscriptionsService,
        private readonly twitterSubscribeService: TwitterSubscribeService
    ) {
        this.subscriptions = []
    }

    @Interval(60_000)
    async handleNewFollowers() {
        console.log('Twitter: Checking for new followers...')
        await this.subscriptionsService.getSubscriptionsByServiceName(ServiceName.Twitter).then((subs) => {
            console.log(`Twitter: Found ${subs.length} subscriptions`)
            this.subscriptions = this.subscriptions.filter((x) => subs.map((y) => y.account.id).includes(x))
            for (const sub of subs)
                void this.scenariosService.getScenariosByTrigger(sub.account.id, ServiceName.Twitter, 'NewFollower')
                    .then((scenarios) => {
                        console.log(`Twitter: Found ${scenarios.length} scenarios for ${sub.account.id}`)
                        for (const scenario of scenarios)
                            void this.twitterService.getNewFollowers(sub.account.id, scenario, sub.accessToken)
                                .then((followers) => {
                                    console.log(`Twitter: Found ${followers.length} new followers`)
                                    console.log(followers)
                                    if (this.subscriptions.includes(sub.account.id)) {
                                        for (const follower of followers)
                                            void this.twitterService.triggerNewFollower(sub.account.id, scenario, follower)
                                    } else {
                                        console.log('Twitter: New Subscription')
                                        this.subscriptions.push(sub.account.id)
                                    }
                                })
                    })
        })
    }

    @Interval(3_600_000)
    async refreshTwitterTokens() {
        console.log('Twitter: Refreshing Twitter tokens...')
        await this.subscriptionsService.getSubscriptionsByServiceName(ServiceName.Twitter).then((subs) => {
            console.log(`Twitter: Found ${subs.length} subscriptions`)
            for (const sub of subs)
                void this.twitterSubscribeService.refreshAccessToken(sub.refreshToken)
                    .then(({ accessToken, refreshToken, expiresIn }) => {
                        console.log(`Twitter: New access token: ${accessToken}`)
                        void this.subscriptionsService.updateSubscription(ServiceName.Twitter, sub.account.id, accessToken, refreshToken, expiresIn)
                    })
        })
    }
}
