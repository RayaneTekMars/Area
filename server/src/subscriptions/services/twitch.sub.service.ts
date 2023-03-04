/* eslint-disable no-console */
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import axios from 'axios'
import { DateTime } from 'luxon'
import type Subscribe from './subscribe'

@Injectable()
export class TwitchSubscribeService implements Subscribe {

    private readonly clientId: string
    private readonly clientSecret: string
    private readonly redirectUri: string
    private readonly scope: string
    private readonly twitchOAuthUrl: string

    constructor(private readonly configService: ConfigService) {
        this.clientId = this.configService.get('TWITCH_OAUTH2_CLIENT_ID') ?? ''
        this.clientSecret = this.configService.get('TWITCH_OAUTH2_CLIENT_SECRET') ?? ''
        this.redirectUri = this.configService.get('TWITCH_OAUTH2_CALLBACK_URL') ?? ''
        this.scope = this.configService.get('TWITCH_OAUTH2_SCOPE') ?? ''
        this.twitchOAuthUrl = 'https://id.twitch.tv/oauth2'
    }

    getAuthorizeUrl() {
        return `${this.twitchOAuthUrl}/authorize?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&response_type=code&scope=${encodeURIComponent(this.scope)}`
    }

    async authorize(code: string) {
        const data = {
            client_id: this.clientId,
            client_secret: this.clientSecret,
            redirect_uri: this.redirectUri,
            grant_type: 'authorization_code',
            code
        }

        try {
            const response = await axios.post(
                `${this.twitchOAuthUrl}/token`,
                data,
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            )

            return {
                accessToken: (response.data as { access_token: string }).access_token,
                refreshToken: (response.data as { refresh_token: string }).refresh_token,
                expiresAt: DateTime.now().plus({ seconds: (response.data as { expires_in: number }).expires_in })
                    .toISO()
            }
        } catch (error) {
            console.error(error)
            throw new Error('Error while getting access token')
        }
    }

    async refreshAccessToken(refreshToken: string) {
        const data = {
            client_id: this.clientId,
            client_secret: this.clientSecret,
            grant_type: 'refresh_token',
            refresh_token: refreshToken
        }

        try {
            const responseRefresh = await axios.post(
                `${this.twitchOAuthUrl}/token`,
                data,
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            )

            const accessToken = (responseRefresh.data as { access_token: string }).access_token

            const responseValidate = await axios.get(
                `${this.twitchOAuthUrl}/validate`,
                {
                    headers: {
                        Authorization: `OAuth ${accessToken}`
                    }
                }
            )

            return {
                accessToken,
                newRefreshToken: (responseRefresh.data as { refresh_token: string }).refresh_token,
                expiresAt: DateTime.now().plus({ seconds: (responseValidate.data as { expires_in: number }).expires_in })
                    .toISO()
            }
        } catch (error) {
            console.error(error)
            throw new Error('Error while refreshing access token')
        }
    }

    async revokeAccessToken(refreshToken: string, accessToken: string) {
        const data = {
            client_id: this.clientId,
            token: accessToken
        }

        try {
            await axios.post(
                `${this.twitchOAuthUrl}/revoke`,
                data,
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            )
        } catch (error) {
            console.error(error)
            throw new Error('Error while revoking access token')
        }
    }
}
