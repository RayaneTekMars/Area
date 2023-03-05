/* eslint-disable no-console */
import { Injectable } from '@nestjs/common'
import SpotifyWebApi from 'spotify-web-api-node'
import { ServicesService } from '../services.service'
import SpotifyIntegration from '../integrations/spotify.integration'
import type { Scenario } from '../../scenarios/entities/scenario.entity'

interface Track {
    id: string
    name: string
    artist: string
}

interface TrackResponse {
    id: string
    name: string
    artists: { name: string }[]
}

@Injectable()
export class SpotifyService {

    LastTrack: {
        accountId: string
        scenarioId: string
        trackId: string
    }[]

    constructor(private readonly servicesService: ServicesService) {
        this.servicesService.setIntegration(new SpotifyIntegration(this))
        this.LastTrack = []
    }

    async getCurrentTrack(accountId: string, scenario: Scenario, accessToken: string): Promise<Track[]> {
        try {
            const spotifyApi = new SpotifyWebApi({ accessToken })
            const scenarioId = scenario.id

            const { scenarioId: lastScenarioId, trackId: lastTrackId }
                = this.LastTrack.find(
                    (x) => x.accountId === accountId && x.scenarioId === scenarioId
                ) ?? { scenarioId: '', trackId: '' }

            const { body: { item: track } } = await spotifyApi.getMyCurrentPlayingTrack() as { body: { item: TrackResponse | undefined } }

            if (!track)
                return []

            if (track.id !== lastTrackId) {
                this.LastTrack = [
                    ...this.LastTrack.filter((x) => !(x.accountId === accountId && x.scenarioId === scenarioId)),
                    { accountId, scenarioId, trackId: track.id }
                ]
                if (lastScenarioId === scenarioId)
                    return [{ id: track.id, name: track.name, artist: track.artists[0].name }]
            }
        } catch (error) {
            console.error(error)
        }
        return []
    }

    async triggerNewTrack(accountId: string, scenario: Scenario, track: Track) {
        const ingredients = new Map<string, string>([
            ['track', track.name],
            ['artist', track.artist],
            ['id', track.id]
        ])
        await this.servicesService.run(accountId, scenario, ingredients)
    }

    async nextMusic(deviceId: string, accessToken: string) {
        try {
            const spotifyApi = new SpotifyWebApi({ accessToken })
            await spotifyApi.skipToNext({ device_id: deviceId })
        } catch (error) {
            console.error(error)
        }
    }

    async previousMusic(deviceId: string, accessToken: string) {
        try {
            const spotifyApi = new SpotifyWebApi({ accessToken })
            await spotifyApi.skipToPrevious({ device_id: deviceId })
        } catch (error) {
            console.error(error)
        }
    }
}
