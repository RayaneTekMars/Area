import { Injectable } from '@nestjs/common'
import { TwitterApi } from 'twitter-api-v2'
import { ServicesService } from '../services.service'
import TwitterIntegration from '../integrations/twitter.integration'
import type { Scenario } from '../../scenarios/entities/scenario.entity'

interface Follower {
    id: string
    name: string
    username: string
}

@Injectable()
export class TwitterService {
    Followers: {
        accountId: string
        scenarioId: string
        userId: string
        followers: string[]
    }[]

    constructor(
        private readonly servicesService: ServicesService
    ) {
        this.Followers = []
        this.servicesService.setIntegration(new TwitterIntegration(this))
    }

    async getNewFollowers(accountId: string, scenario: Scenario, accessToken: string): Promise<Follower[]> {
        try {
            const twitterApi = new TwitterApi(accessToken)
            const { data: { id: userId } } = await twitterApi.v2.me()
            const scenarioId = scenario.id
            const lastFollowers = this.Followers.find(
                (x) => x.accountId === accountId && x.scenarioId === scenarioId
            )?.followers
            const { data: followers } = await twitterApi.v2.followers(userId)
            const newFollowers = followers.filter(
                (x) => !((lastFollowers?.includes(x.id)) ?? false)
            )

            this.Followers = [
                ...this.Followers.filter((x) => x.accountId !== accountId && x.scenarioId !== scenarioId),
                { accountId, scenarioId, userId, followers: followers.map((x) => x.id) }
            ]

            return newFollowers.map(({ id, name, username }) => ({
                id,
                name,
                username
            }))
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error)
        }
        return []
    }

    async triggerNewFollower(accountId: string, scenario: Scenario, follower: Follower) {
        const ingredients = new Map<string, string>([
            ['id', follower.id],
            ['name', follower.name],
            ['username', follower.username]
        ])
        await this.servicesService.run(accountId, scenario, ingredients)
    }

    async postTweet(tweet: string, accessToken: string) {
        try {
            const twitterApi = new TwitterApi(accessToken)
            await twitterApi.v2.tweet(tweet)
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error)
        }
    }
}
