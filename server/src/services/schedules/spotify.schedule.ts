/* eslint-disable max-depth, no-console */
import { Injectable } from '@nestjs/common'
import { Interval } from '@nestjs/schedule'
import { SpotifyService } from '../services/spotify.service'
import { ScenariosService } from '../../scenarios/scenarios.service'
import { SubscriptionsService } from '../../subscriptions/subscriptions.service'
import { ServiceName } from '../../common/types/service.type'
import { SpotifySubscribeService } from '../../subscriptions/services/spotify.sub.service'

@Injectable()
export class SpotifySchedule {
    subscriptions: string[]

    constructor(
        private readonly spotifyService: SpotifyService,
        private readonly scenariosService: ScenariosService,
        private readonly subscriptionsService: SubscriptionsService,
        private readonly spotifySubscribeService: SpotifySubscribeService
    ) {
        this.subscriptions = []
    }

    @Interval(3000)
    async detectChangingTrack() {
        console.log('Spotify: Checking for new tracks...')
        const subs = await this.subscriptionsService.getSubscriptionsByServiceName(ServiceName.Spotify)
        console.log(`Spotify: Found ${subs.length} subscriptions`)
        this.subscriptions = this.subscriptions.filter((x) => subs.map((y) => y.account.id).includes(x))
        for await (const sub of subs) {
            const scenarios = await this.scenariosService.getScenariosByTrigger(sub.account.id, ServiceName.Spotify, 'MusicChange')
            console.log(`Spotify: Found ${scenarios.length} scenarios for ${sub.account.id}`)
            for await (const scenario of scenarios) {
                const tracks = await this.spotifyService.getCurrentTrack(sub.account.id, scenario, sub.accessToken)
                console.log('Spotify: Found new track:', tracks)
                if (this.subscriptions.includes(sub.account.id)) {
                    for (const track of tracks)
                        void this.spotifyService.triggerNewTrack(sub.account.id, scenario, track)
                } else {
                    console.log('Spotify: New Subscription')
                    this.subscriptions.push(sub.account.id)
                }
            }
        }
    }

    @Interval(1_800_000)
    async refreshAccessToken() {
        console.log('Spotify: Refreshing Github tokens...')
        const subs = await this.subscriptionsService.getSubscriptionsByServiceName(ServiceName.Spotify)
        console.log(`Spotify: Found ${subs.length} subscriptions`)
        for await (const sub of subs)
            try {
                const { accessToken } = await this.spotifySubscribeService.refreshAccessToken(sub.refreshToken)
                console.log(`Spotify: New access token: ${accessToken}`)
                void this.subscriptionsService.updateSubscription(ServiceName.Spotify, sub.account.id, accessToken, sub.refreshToken, sub.expiresIn)
            } catch {
                throw new Error('Spotify: Error refreshing access token')
            }
  }
}
