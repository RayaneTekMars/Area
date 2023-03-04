/* eslint-disable max-depth, no-console */
import { Injectable } from '@nestjs/common'
import { Interval } from '@nestjs/schedule'
import { GithubService } from '../services/github.service'
import { ScenariosService } from '../../scenarios/scenarios.service'
import { SubscriptionsService } from '../../subscriptions/subscriptions.service'
import { ServiceName } from '../../common/types/service.type'
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
        const subs = await this.subscriptionsService.getSubscriptionsByServiceName(ServiceName.Github)
        console.log(`Github: Found ${subs.length} subscriptions`)
        this.subscriptions = this.subscriptions.filter((x) => subs.map((y) => y.account.id).includes(x))
        for await (const sub of subs) {
            const scenarios = await this.scenariosService.getScenariosByTrigger(sub.account.id, ServiceName.Github, 'NewCommit')
            console.log(`Github: Found ${scenarios.length} scenarios for the user "${sub.account.username}"`)
            for await (const scenario of scenarios) {
                const commits = await this.githubService.getNewCommits(sub.account.id, scenario, sub.accessToken)
                console.log(`Github: Found ${commits.length} new commits:`)
                console.log(commits)
                if (this.subscriptions.includes(sub.account.id)) {
                    for (const commit of commits)
                        void this.githubService.triggerNewCommit(sub.account.id, scenario, commit)
                } else {
                    console.log('Github: New Subscription found')
                    this.subscriptions.push(sub.account.id)
                }
            }
        }
    }

    @Interval(3_600_000)
    async refreshGithubTokens() {
        console.log('Github: Refreshing Github tokens...')
        const subs = await this.subscriptionsService.getSubscriptionsByServiceName(ServiceName.Github)
        console.log(`Github: Found ${subs.length} subscriptions`)
        for await (const sub of subs) {
            try {
                const { accessToken } = await this.githubSubscribeService.refreshAccessToken(sub.refreshToken, sub.accessToken)
                void this.subscriptionsService.updateSubscription(ServiceName.Github, sub.account.id, accessToken, sub.refreshToken, sub.expiresAt)
            } catch (error) {
                console.error(error)
                throw new Error('Error refreshing access token')
            }
        }
    }
}
