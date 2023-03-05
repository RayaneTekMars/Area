/* eslint-disable no-console */
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

interface DirectMessage {
    id: string
    text: string
    senderId: string
    senderName: string
    senderUsername: string
}

@Injectable()
export class TwitterService {

    Followers: {
        accountId: string
        scenarioId: string
        followers: string[]
    }[]

    LastDirectMessage: {
        accountId: string
        scenarioId: string
        senderId: string
        id: number
    }[]

    constructor(private readonly servicesService: ServicesService) {
        this.Followers = []
        this.LastDirectMessage = []
        this.servicesService.setIntegration(new TwitterIntegration(this))
    }

    async getNewFollowers(accountId: string, scenario: Scenario, accessToken: string): Promise<Follower[]> {
        try {
            const twitterApi = new TwitterApi(accessToken)

            const scenarioId = scenario.id

            const { data: { id: userId } } = await twitterApi.v2.me()
            const lastFollowers = this.Followers.find(
                (x) => x.accountId === accountId && x.scenarioId === scenarioId
            )?.followers ?? []

            const { data: followers } = await twitterApi.v2.followers(userId)
            const newFollowers: Follower[] = followers
                .filter((x) => !lastFollowers.includes(x.id))
                .map(({ id, name, username }) => ({
                    id,
                    name,
                    username: `@${username}`
                }))

            this.Followers = [
                ...this.Followers.filter((x) => !(x.accountId === accountId && x.scenarioId === scenarioId)),
                { accountId, scenarioId, followers: followers.map((x) => x.id) }
            ]

            return newFollowers
        } catch (error) {
            console.error(error)
        }
        return []
    }

    async getNewDirectMessages(accountId: string, scenario: Scenario, accessToken: string): Promise<DirectMessage[]> {
        try {
            const twitterApi = new TwitterApi(accessToken)

            const scenarioId = scenario.id
            const { data: { id: userId } } = await twitterApi.v2.me()
            const username = scenario.trigger.fields.find((x) => x.name === 'username')?.value ?? ''

            const { id: lastDirectMessage, senderId: lastSenderId } = this.LastDirectMessage.find(
                (x) => x.accountId === accountId && x.scenarioId === scenarioId
            ) ?? { id: 0, senderId: '' }

            const dmEvent = await twitterApi.v2.listDmEvents({
                'dm_event.fields': 'id,text,sender_id',
                event_types: 'MessageCreate',
                max_results: 50,
                'user.fields': 'id,name,username',
                expansions: 'sender_id'
            })

            const { data: { id: senderId } } = username
                ? (await twitterApi.v2.userByUsername(username.replace(/^@/, '')))
                : { data: { id: '' } }

            const newDirectMessages = dmEvent.events
                .filter((x) =>
                    Number(x.id) > lastDirectMessage
                    && x.sender_id !== userId
                    && (senderId ? x.sender_id === senderId : true))
                .map((x) => ({
                    id: x.id,
                    text: (x as { text: string }).text,
                    senderId: x.sender_id ?? '',
                    senderName: dmEvent.includes.userById(x.sender_id ?? '')?.name ?? '',
                    senderUsername: `@${dmEvent.includes.userById(x.sender_id ?? '')?.username ?? ''}`
                }))

            this.LastDirectMessage = [
                ...this.LastDirectMessage.filter((x) => !(x.accountId === accountId && x.scenarioId === scenarioId)),
                { accountId, scenarioId, senderId, id: Number(dmEvent.events[0]?.id ?? ((lastSenderId === senderId) ? lastDirectMessage : 0)) }
            ]

            return (lastSenderId === senderId) ? newDirectMessages : []
        } catch (error) {
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

    async triggerNewDirectMessage(id: string, scenario: Scenario, message: DirectMessage) {
        const ingredients = new Map<string, string>([
            ['id', message.id],
            ['text', message.text],
            ['sender_id', message.senderId],
            ['sender_name', message.senderName],
            ['sender_username', message.senderUsername]
        ])
        await this.servicesService.run(id, scenario, ingredients)
    }

    async postTweet(tweet: string, accessToken: string) {
        try {
            const twitterApi = new TwitterApi(accessToken)
            await twitterApi.v2.tweet(tweet)
        } catch (error) {
            console.error(error)
        }
    }

    async createDirectMessage(text: string, username: string, accessToken: string) {
        try {
            const twitterApi = new TwitterApi(accessToken)
            const { data: { id: recipientId } } = await twitterApi.v2.userByUsername(username)

            await twitterApi.v2.sendDmToParticipant(recipientId, { text })
        } catch (error) {
            console.error(error)
        }
    }
}
