import { Injectable } from '@nestjs/common'
import { Interval } from '@nestjs/schedule'
import { TwitterService } from '../services/twitter.service'
import { ScenariosService } from '../../scenarios/scenarios.service'
import { SubscriptionsService } from '../../subscriptions/subscriptions.service'
import { ServiceName } from '../../common/enums/service-name.enum'
import { TwitterSubscribeService } from '../../subscriptions/services/twitter.sub.service'

@Injectable()
export class TwitterSchedule {

    constructor(
        private readonly twitterService: TwitterService,
        private readonly scenariosService: ScenariosService,
        private readonly subscriptionsService: SubscriptionsService,
        private readonly twitterSubscribeService: TwitterSubscribeService,
    ) {
        this.subscriptionsService.getSubscriptionsByServiceName(ServiceName.Twitter).
            then((subs) => {
                for (const sub of subs) {
                    this.scenariosService.getScenariosByTrigger(sub.account.id, ServiceName.Twitter, 'NewFollower')
                        .then((scenarios) => {
                            for (const scenario of scenarios) {
                                this.twitterService.getNewFollowers(sub.account.id, sub.accessToken);
                            }
                        })
                }
            })
    }

    @Interval(60000)
    async handleNewFollowers() {

        console.log('Checking for new followers...');

        const subscriptions = await this.subscriptionsService.getSubscriptionsByServiceName(ServiceName.Twitter);

        console.log('Found ' + subscriptions.length + ' subscriptions');

        for (const sub of subscriptions) {

            const scenarios = await this.scenariosService.getScenariosByTrigger(sub.account.id, ServiceName.Twitter, 'NewFollower');

            console.log('Found ' + scenarios.length + ' scenarios');

            for (const scenario of scenarios) {

                const followers = await this.twitterService.getNewFollowers(sub.account.id, sub.accessToken);

                console.log('Found ' + followers.length + ' new followers');
                console.log(followers);

                for (const follower of followers) {

                    this.twitterService.triggerNewFollower(sub.account.id, follower);

                }

            }

        }

    }

    @Interval(3600000)
    async refreshTwitterTokens() {

        console.log('Refreshing Twitter tokens...');

        const subscriptions = await this.subscriptionsService.getSubscriptionsByServiceName(ServiceName.Twitter);

        console.log('Found ' + subscriptions.length + ' subscriptions');

        for (const sub of subscriptions) {

            const { accessToken, refreshToken, expiresIn } = await this.twitterSubscribeService.refreshAccessToken(sub.refreshToken!);

            console.log('New access token: ' + accessToken);

            await this.subscriptionsService.updateSubscription('Twitter', sub.account.id, accessToken, refreshToken!, expiresIn);

        }

    }

}