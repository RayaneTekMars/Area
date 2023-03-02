/* eslint-disable max-depth, no-console */
import { Injectable } from '@nestjs/common'
import { Interval } from '@nestjs/schedule'
import { TwitterService } from '../services/twitter.service'
import { ScenariosService } from '../../scenarios/scenarios.service'
import { SubscriptionsService } from '../../subscriptions/subscriptions.service'
import { ServiceName } from '../../common/types/service.type'
import { TwitterSubscribeService } from '../../subscriptions/services/twitter.sub.service'

@Injectable()
export class TwitterSchedule {
    subscriptionsNewFollowers: string[]
    subscriptionsNewDirectMessages: string[]

    constructor(
        private readonly twitterService: TwitterService,
        private readonly scenariosService: ScenariosService,
        private readonly subscriptionsService: SubscriptionsService,
        private readonly twitterSubscribeService: TwitterSubscribeService
    ) {
        this.subscriptionsNewFollowers = []
        this.subscriptionsNewDirectMessages = []
    }

    @Interval(60_000)
    async handleNewFollowers() {
        console.log('Twitter: Checking for new followers...')
        const subs = await this.subscriptionsService.getSubscriptionsByServiceName(ServiceName.Twitter)
        console.log(`Twitter: Found ${subs.length} subscriptions`)
        this.subscriptionsNewFollowers = this.subscriptionsNewFollowers.filter((x) => subs.map((y) => y.account.id).includes(x))
        for await (const sub of subs) {
            const scenarios = await this.scenariosService.getScenariosByTrigger(sub.account.id, ServiceName.Twitter, 'NewFollower')
            console.log(`Twitter: Found ${scenarios.length} scenarios for ${sub.account.id}`)
            for await (const scenario of scenarios) {
                const followers = await this.twitterService.getNewFollowers(sub.account.id, scenario, sub.accessToken)
                console.log(`Twitter: Found ${followers.length} new followers`)
                console.log(followers)
                if (this.subscriptionsNewFollowers.includes(sub.account.id)) {
                    for (const follower of followers)
                        void this.twitterService.triggerNewFollower(sub.account.id, scenario, follower)
                } else {
                    console.log('Twitter: New Subscription for Followers')
                    this.subscriptionsNewFollowers.push(sub.account.id)
                }
            }
        }
    }

    @Interval(60_000)
    async handleNewDirectMessages() {
        console.log('Twitter: Checking for new direct messages...')
        const subs = await this.subscriptionsService.getSubscriptionsByServiceName(ServiceName.Twitter)
        console.log(`Twitter: Found ${subs.length} subscriptions`)
        for await (const sub of subs) {
            const scenarios = await this.scenariosService.getScenariosByTrigger(sub.account.id, ServiceName.Twitter, 'NewDirectMessage')
            console.log(`Twitter: Found ${scenarios.length} scenarios for ${sub.account.id}`)
            for await (const scenario of scenarios) {
                const messages = await this.twitterService.getNewDirectMessages(sub.account.id, scenario, sub.accessToken)
                console.log(`Twitter: Found ${messages.length} new direct messages`)
                console.log(messages)
                if (this.subscriptionsNewDirectMessages.includes(sub.account.id)) {
                    for (const message of messages)
                        void this.twitterService.triggerNewDirectMessage(sub.account.id, scenario, message)
                } else {
                    console.log('Twitter: New Subscription for Direct Messages')
                    this.subscriptionsNewDirectMessages.push(sub.account.id)
                }
            }
        }
    }

    @Interval(3_600_000)
    async refreshTwitterTokens() {
        console.log('Twitter: Refreshing Twitter tokens...')
        const subs = await this.subscriptionsService.getSubscriptionsByServiceName(ServiceName.Twitter)
        console.log(`Twitter: Found ${subs.length} subscriptions`)
        for await (const sub of subs)
            try {
                const { accessToken, newRefreshToken, expiresIn } = await this.twitterSubscribeService.refreshAccessToken(sub.refreshToken)
                console.log(`Twitter: New access token: ${accessToken}`)
                void this.subscriptionsService.updateSubscription(ServiceName.Twitter, sub.account.id, accessToken, newRefreshToken, expiresIn)
            } catch {
                throw new Error('Twitter: Error refreshing access token')
            }
    }
}
