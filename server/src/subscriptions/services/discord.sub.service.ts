import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import axios from 'axios'

@Injectable()
export class DiscordSubscribeService {
  private readonly discordOAuthUrl: string

  constructor(private readonly configService: ConfigService) {
    this.discordOAuthUrl = 'https://discord.com/oauth2/authorize'
  }

  getAuthorizeUrl(): string {
    const clientId: string = this.configService.get('DISCORD_OAUTH2_CLIENT_ID') ?? ''
    const redirectUri: string = this.configService.get('DISCORD_OAUTH2_CALLBACK_URL') ?? ''

    return `${this.discordOAuthUrl}?client_id=${clientId}&permissions=3072&redirect_uri=${redirectUri}&response_type=code&scope=identify%20bot`
  }

  async authorize(code: string): Promise<{
    accessToken: string
    refreshToken: string
    expiresIn: number
  }> {
    const clientId: string = this.configService.get('DISCORD_OAUTH2_CLIENT_ID') ?? ''
    const clientSecret: string = this.configService.get('DISCORD_OAUTH2_CLIENT_SECRET') ?? ''
    const redirectUri: string = this.configService.get('DISCORD_OAUTH2_CALLBACK_URL') ?? ''

    const data = {
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
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
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
        expiresIn: response.data.expires_in
      }
    } catch {
      throw new Error('Error while getting access token')
    }
  }

  async refreshAccessToken(refreshToken: string): Promise<{
    accessToken: string
    newRefreshToken: string
    expiresIn: number
  }> {
    const clientId: string = this.configService.get('DISCORD_OAUTH2_CLIENT_ID') ?? ''
    const clientSecret: string = this.configService.get('DISCORD_OAUTH2_CLIENT_SECRET') ?? ''

    const data = {
      client_id: clientId,
      client_secret: clientSecret,
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

      const accessToken = response.data.access_token
      const newRefreshToken = response.data.refresh_token
      const expiresIn = response.data.expires_in

      return { accessToken, newRefreshToken, expiresIn }

    } catch {
      throw new Error('Error while getting access token')
    }
  }
}
