import { Injectable } from '@nestjs/common'
import { Interval } from '@nestjs/schedule'
import { TwitterService } from '../services/twitter.service'
import { ScenariosService } from '../../scenarios/scenarios.service'
import { SubscriptionsService } from '../../subscriptions/subscriptions.service'
import { ServiceName } from '../../common/enums/service-name.enum'

@Injectable()
export class TwitterSchedule {

    constructor(
        private readonly twitterService: TwitterService,
        private readonly scenariosService: ScenariosService,
        private readonly subscriptionsService: SubscriptionsService,
    ) { }

    @Interval(10000)
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

}