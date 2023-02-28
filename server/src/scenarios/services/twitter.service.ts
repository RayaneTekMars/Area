import { Injectable } from '@nestjs/common'
import { TwitterApi } from 'twitter-api-v2'
import { ScenariosService } from '../scenarios.service'
import { ServiceName } from '../types/service.type'
import TwitterIntegration from '../integrations/twitter.integration'
import type { Scenario } from '../entities/scenario.entity'

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
        private readonly scenariosService: ScenariosService
    ) {
        this.Followers = []
        scenariosService.setIntegration(new TwitterIntegration(this))
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

        const trigger = this.scenariosService.getIntegrationByName(ServiceName.Twitter)
            ?.getTriggerByName('NewFollower')
            ?.getTrigger()

        if (!trigger)
            return

        trigger.ingredients.map((ingredient) => {
            switch (ingredient.name) {
                case 'id':
                    ingredient.value = follower.id
                    break
                case 'name':
                    ingredient.value = follower.name
                    break
                case 'username':
                    ingredient.value = follower.username
                    break
                default:
                    break
            }
        })

        await this.scenariosService.emit(accountId, trigger, scenario.reaction)
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
