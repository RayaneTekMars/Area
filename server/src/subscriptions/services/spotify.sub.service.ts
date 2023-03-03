import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import axios from 'axios'
import { DateTime } from 'luxon'
import type Subscribe from './subscribe'

@Injectable()
export class SpotifySubscribeService implements Subscribe {

    private readonly clientId: string
    private readonly clientSecret: string
    private readonly basicAuth: string
    private readonly redirectUri: string
    private readonly scope: string
    private readonly spotifyOAuthUrl: string

    constructor(private readonly configService: ConfigService) {
        this.clientId = this.configService.get('SPOTIFY_OAUTH2_CLIENT_ID') ?? ''
        this.clientSecret = this.configService.get('SPOTIFY_OAUTH2_CLIENT_SECRET') ?? ''
        this.basicAuth = Buffer.from(`${this.clientId}:${this.clientSecret}`, 'ascii').toString('base64')
        this.redirectUri = this.configService.get('SPOTIFY_OAUTH2_CALLBACK_URL') ?? ''
        this.scope = this.configService.get('SPOTIFY_OAUTH2_SCOPE') ?? ''
        this.spotifyOAuthUrl = 'https://accounts.spotify.com/authorize'
    }

    getAuthorizeUrl() {
        return `${this.spotifyOAuthUrl}?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&response_type=code&scope=${encodeURIComponent(this.scope)}`
    }

    async authorize(code: string) {
        const data = {
            redirect_uri: this.redirectUri,
            grant_type: 'authorization_code',
            code
        }

        try {
            const response = await axios.post(
                'https://accounts.spotify.com/api/token',
                data,
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded',
                        Authorization: `Basic ${this.basicAuth}`
                    }
                }
            )

            return {
                accessToken: (response.data as { access_token: string }).access_token,
                refreshToken: (response.data as { refresh_token: string }).refresh_token,
                expiresAt: DateTime.now().plus({ seconds: (response.data as { expires_in: number }).expires_in })
                    .toISO()
            }
        } catch {
            throw new Error('Error while getting access token')
        }
    }

    async refreshAccessToken(refreshToken: string) {
        const data = {
            grant_type: 'refresh_token',
            refresh_token: refreshToken
        }

        try {
            const response = await axios.post(
                'https://accounts.spotify.com/api/token',
                data,
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded',
                        Authorization: `Basic ${this.basicAuth}`
                    }
                }
            )

            return {
                accessToken: (response.data as { access_token: string }).access_token,
                newRefreshToken: refreshToken,
                expiresAt: DateTime.now().plus({ seconds: (response.data as { expires_in: number }).expires_in })
                    .toISO()
            }
        } catch {
            throw new Error('Error while getting access token')
        }
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    async revokeAccessToken(refreshToken: string) {
        void refreshToken
    }
}
