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

    constructor(
        private readonly spotifyService: SpotifyService,
        private readonly scenariosService: ScenariosService,
        private readonly subscriptionsService: SubscriptionsService,
        private readonly spotifySubscribeService: SpotifySubscribeService
    ) {}

    @Interval(5000)
    async detectChangingTrack() {
        console.log('Spotify: Checking for new tracks...')
        const subs = await this.subscriptionsService.getSubscriptionsByServiceName(ServiceName.Spotify)
        console.log(`Spotify: Found ${subs.length} subscriptions`)
        for await (const sub of subs) {
            const scenarios = await this.scenariosService.getScenariosByTrigger(sub.account.id, ServiceName.Spotify, 'MusicChange')
            console.log(`Spotify: Found ${scenarios.length} scenarios for the user "${sub.account.username}"`)
            for await (const scenario of scenarios) {
                const tracks = await this.spotifyService.getCurrentTrack(sub.account.id, scenario, sub.accessToken)
                console.log('Spotify: Found new track:', tracks)
                for (const track of tracks)
                    void this.spotifyService.triggerNewTrack(sub.account.id, scenario, track)
            }
        }
    }

    @Interval(1_800_000)
    async refreshAccessToken() {
        console.log('Spotify: Refreshing Github tokens...')
        const subs = await this.subscriptionsService.getSubscriptionsByServiceName(ServiceName.Spotify)
        console.log(`Spotify: Found ${subs.length} subscriptions`)
        for await (const sub of subs) {
            try {
                const { accessToken } = await this.spotifySubscribeService.refreshAccessToken(sub.refreshToken)
                void this.subscriptionsService.updateSubscription(ServiceName.Spotify, sub.account.id, accessToken, sub.refreshToken, sub.expiresAt)
            } catch (error) {
                console.error(error)
                throw new Error('Spotify: Error refreshing access token')
            }
        }
    }
}
