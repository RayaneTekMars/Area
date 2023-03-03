import { Injectable } from '@nestjs/common'
import axios from 'axios'
import TwitchIntegration from '../integrations/twitch.integration'
import { ServicesService } from '../services.service'
import type { Scenario } from 'src/scenarios/entities/scenario.entity'


interface Stream {
    id: string
    user_name: string
    title: string
    game_name: string
    viewer_count: string
    started_at: Date
}

@Injectable()
export class TwitchService {

    LastStream: {
        accountId: string
        scenarioId: string
        streamId: string
    }[]

    constructor(
        private readonly servicesService: ServicesService
    ) {
        this.servicesService.setIntegration(new TwitchIntegration(this))
    }

    async getStreams(accountId: string, scenario: Scenario, accessToken: string): Promise<Stream[]> {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Client-ID': 'your-client-id'
            }
        }
        const response = await axios.get<{ data: Stream[] }>('https://api.twitch.tv/helix/streams', config)
        const streams: Stream[] = response.data.data.map((stream: Stream) => ({
            id: stream.id,
            user_name: stream.user_name,
            title: stream.title,
            game_name: stream.game_name,
            viewer_count: stream.viewer_count,
            started_at: new Date(stream.started_at)
        }))
        const scenarioId = scenario.id
        const lastStream = this.LastStream.find(
            (x) => x.accountId === accountId && x.scenarioId === scenarioId
        )?.streamId
        const newStreams: Stream[] = []
        for (const stream of streams)
            if (lastStream !== stream.id) {
                this.LastStream = [
                    ...this.LastStream.filter((x) => x.accountId !== accountId && x.scenarioId !== scenarioId),
                    {
                        accountId,
                        scenarioId,
                        streamId: stream.id
                    }
                ]
                newStreams.push({
                    id: stream.id,
                    user_name: stream.user_name,
                    title: stream.title,
                    game_name: stream.game_name,
                    viewer_count: stream.viewer_count,
                    started_at: new Date(stream.started_at)
                })
            }

        return newStreams
    }

    async triggerNewStream(accountId: string, scenario: Scenario, stream: Stream) {
        const ingredients = new Map<string, string>([
            ['id', stream.id],
            ['user_name', stream.user_name],
            ['title', stream.title],
            ['game_name', stream.game_name],
            ['viewer_count', stream.viewer_count],
            ['started_at', stream.started_at.toString()]
        ])

        await this.servicesService.run(accountId, scenario, ingredients)
    }
}
