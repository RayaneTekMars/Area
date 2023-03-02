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
    track: string
  }[]

  constructor(
    private readonly servicesService: ServicesService
  ) {
    this.servicesService.setIntegration(new SpotifyIntegration(this))
    this.LastTrack = []
  }

  async getCurrentTrack(accountId: string, scenario: Scenario, accessToken: string): Promise<Track[]> {
    const spotifyApi = new SpotifyWebApi({
      accessToken
    })
    const { body: { item: track } } = await spotifyApi.getMyCurrentPlayingTrack() as { body: { item: TrackResponse } }
    const scenarioId = scenario.id
    const lastTrack = this.LastTrack.find(
      (x) => x.accountId === accountId && x.scenarioId === scenarioId
    )?.track
    if (lastTrack !== track.id) {
      this.LastTrack = [
        ...this.LastTrack.filter((x) => x.accountId !== accountId && x.scenarioId !== scenarioId),
        {
          accountId,
          scenarioId,
          track: track.id
        }
      ]
      return [{
        id: track.id,
        name: track.name,
        artist: track.artists[0].name
      }]
    }
    return []
  }

  async triggerNewTrack(accountId: string, scenario: Scenario, track: Track) {
    const ingredients = new Map<string, string>([
      ['name', track.name],
      ['artist', track.artist],
      ['id', track.id]
    ])

    await this.servicesService.run(accountId, scenario, ingredients)
  }
}
