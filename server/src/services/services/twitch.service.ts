/* eslint-disable no-console */
import { Injectable } from '@nestjs/common'
import TwitchApi from 'node-twitch'
import { ConfigService } from '@nestjs/config'
import TwitchIntegration from '../integrations/twitch.integration'
import { ServicesService } from '../services.service'
import type { Scenario } from 'src/scenarios/entities/scenario.entity'

interface Stream {
    id: string
    username: string
    url: string
    title: string
    game: string
    startedAt: Date
}

@Injectable()
export class TwitchService {

    LastStream: {
        accountId: string
        scenarioId: string
        streamId: string
    }[]

    constructor(
        private readonly servicesService: ServicesService,
        private readonly configService: ConfigService
    ) {
        this.servicesService.setIntegration(new TwitchIntegration(this))
        this.LastStream = []
    }

    async getStreamOfUser(accountId: string, scenario: Scenario, accessToken: string): Promise<Stream[]> {
        try {
            const twitchApi = new TwitchApi({
                client_id: this.configService.get('TWITCH_OAUTH2_CLIENT_ID') ?? '',
                client_secret: this.configService.get('TWITCH_OAUTH2_CLIENT_SECRET') ?? '',
                access_token: accessToken,
                scopes: ['user:read:email', 'channel:read:subscriptions']
            })

            const username = scenario.trigger.fields.find((x) => x.name === 'username')?.value ?? ''
            const scenarioId = scenario.id

            if (!username)
                return []

            const lastStream = this.LastStream.find(
                (x) => x.accountId === accountId && x.scenarioId === scenarioId
            )?.streamId ?? ''

            const { data: streams } = await twitchApi.getStreams({ channel: username })

            const newStreams: Stream[] = streams.filter((x) => x.id !== lastStream)
                .map((x) => ({
                    id: x.id,
                    username: x.user_name,
                    url: `https://twitch.tv/${x.user_name}`,
                    title: x.title,
                    game: x.game_name,
                    startedAt: new Date(x.started_at)
                }))

            this.LastStream = [
                ...this.LastStream.filter((x) => !(x.accountId === accountId && x.scenarioId === scenarioId)),
                { accountId, scenarioId, streamId: newStreams[0]?.id ?? lastStream }
            ]

            return newStreams
        } catch (error) {
            console.error(error)
        }
        return []
    }


    async triggerNewStream(accountId: string, scenario: Scenario, stream: Stream) {
        const ingredients = new Map<string, string>([
            ['username', stream.username],
            ['url', stream.url],
            ['title', stream.title],
            ['game', stream.game],
            ['started_at', stream.startedAt.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })]
        ])
        await this.servicesService.run(accountId, scenario, ingredients)
    }
}
