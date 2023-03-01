import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import axios from 'axios'

@Injectable()
export class DiscordSubscribeService {

    private readonly clientId: string
    private readonly clientSecret: string
    private readonly redirectUri: string
    private readonly scope: string
    private readonly discordOAuthUrl: string

    constructor(private readonly configService: ConfigService) {
        this.clientId = this.configService.get('DISCORD_OAUTH2_CLIENT_ID') ?? ''
        this.clientSecret = this.configService.get('DISCORD_OAUTH2_CLIENT_SECRET') ?? ''
        this.redirectUri = this.configService.get('DISCORD_OAUTH2_CALLBACK_URL') ?? ''
        this.scope = this.configService.get('DISCORD_OAUTH2_SCOPE') ?? ''
        this.discordOAuthUrl = 'https://discord.com/oauth2/authorize'
    }

    getAuthorizeUrl(): string {
        const clientId: string = this.configService.get('DISCORD_OAUTH2_CLIENT_ID') ?? ''
        const redirectUri: string = this.configService.get('DISCORD_OAUTH2_CALLBACK_URL') ?? ''

        return `${this.discordOAuthUrl}?client_id=${clientId}&permissions=3072&redirect_uri=${redirectUri}&response_type=code&scope=${encodeURIComponent(this.scope)}`
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
                'https://discord.com/api/v10/oauth2/token',
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
                expiresIn: Number((response.data as { expires_in: string }).expires_in)
            }
        } catch {
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
            const response = await axios.post(
                'https://discord.com/api/v10/oauth2/token',
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
                newRefreshToken: (response.data as { refresh_token: string }).refresh_token,
                expiresIn: Number((response.data as { expires_in: string }).expires_in)
            }
        } catch {
            throw new Error('Error while getting access token')
        }
    }

    async revokeAccessToken(accessToken: string) {
        const data = {
            client_id: this.clientId,
            client_secret: this.clientSecret,
            token: accessToken
        }

        try {
            await axios.post(
                'https://discord.com/api/v10/oauth2/token/revoke',
                data,
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            )
        } catch {
            throw new Error('Error while revoking access token')
        }
    }
}
