/* eslint-disable no-console */
import { Injectable } from '@nestjs/common'
import { Interval } from '@nestjs/schedule'
import { GithubService } from '../services/github.service'
import { ScenariosService } from '../scenarios.service'
import { SubscriptionsService } from '../../subscriptions/subscriptions.service'
import { ServiceName } from '../types/service.type'
import { GithubSubscribeService } from '../../subscriptions/services/github.sub.service'

@Injectable()
export class GithubSchedule {
    subscriptions: string[]

    constructor(
        private readonly githubService: GithubService,
        private readonly scenariosService: ScenariosService,
        private readonly subscriptionsService: SubscriptionsService,
        private readonly githubSubscribeService: GithubSubscribeService
    ) {
        this.subscriptions = []
    }

    @Interval(60_000)
    async handleNewCommits() {
        console.log('Github: Checking for new commits...')
        await this.subscriptionsService.getSubscriptionsByServiceName(ServiceName.Github).then((subs) => {
            console.log(`Github: Found ${subs.length} subscriptions`)
            this.subscriptions = this.subscriptions.filter((x) => subs.map((y) => y.account.id).includes(x))
            for (const sub of subs)
                void this.scenariosService.getScenariosByTrigger(sub.account.id, ServiceName.Github, 'NewCommit')
                    .then((scenarios) => {
                        console.log(`Github: Found ${scenarios.length} scenarios for ${sub.account.id}`)
                        for (const scenario of scenarios)
                            void this.githubService.getNewCommits(sub.account.id, scenario, sub.accessToken)
                                .then((commits) => {
                                    console.log(`Github: Found ${commits.length} new commits`)
                                    console.log(commits)
                                    if (this.subscriptions.includes(sub.account.id)) {
                                        for (const commit of commits)
                                            void this.githubService.triggerNewCommit(sub.account.id, scenario, commit)
                                    } else {
                                        console.log('Github: New Subscription')
                                        this.subscriptions.push(sub.account.id)
                                    }
                                })

                    })
        })
    }
}
