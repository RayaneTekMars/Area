import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import axios from 'axios'

@Injectable()
export class GithubSubscribeService {
  private readonly githubOAuthUrl: string

  constructor(private readonly configService: ConfigService) {
    this.githubOAuthUrl = 'https://github.com/login/oauth'
  }

  getAuthorizeUrl(): string {
    const clientId: string = this.configService.get('GITHUB_OAUTH2_CLIENT_ID') ?? ''
    const redirectUri: string = this.configService.get('GITHUB_OAUTH2_CALLBACK_URL') ?? ''
    return `${
      this.githubOAuthUrl
    }/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`
  }

  async authorize(code: string): Promise<{
    accessToken: string
    refreshToken: string
    expiresIn: number
  }> {
    const clientId: string = this.configService.get('GITHUB_OAUTH2_CLIENT_ID') ?? ''
    const clientSecret: string = this.configService.get('GITHUB_OAUTH2_CLIENT_SECRET') ?? ''
    const redirectUri: string = this.configService.get('GITHUB_OAUTH2_CALLBACK_URL') ?? ''

    const data = {
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      code
    }

    try {
      const response = await axios.post(
        `${this.githubOAuthUrl}/access_token`,
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
    const clientId: string = this.configService.get('GITHUB_OAUTH2_CLIENT_ID') ?? ''
    const clientSecret: string = this.configService.get('GITHUB_OAUTH2_CLIENT_SECRET') ?? ''

    const response = await axios.post(
      `${this.githubOAuthUrl}/access_token`,
      {
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token'
      },
      {
        headers: {
          accept: 'application/json'
        }
      }
    )

    const accessToken = response.data.access_token
    const newRefreshToken = response.data.refresh_token
    const expiresIn = response.data.expires_in

    return { accessToken, newRefreshToken, expiresIn }
  }

  async revokeAccessToken(refreshToken: string): Promise<void> {
    const clientId: string = this.configService.get('GITHUB_OAUTH2_CLIENT_ID') ?? ''
    const clientSecret: string = this.configService.get('GITHUB_OAUTH2_CLIENT_SECRET') ?? ''

    await axios.post(
      `${this.githubOAuthUrl}/revoke`,
      {
        client_id: clientId,
        client_secret: clientSecret,
        token: refreshToken
      },
      {
        headers: {
          accept: 'application/json'
        }
      }
    )
  }
}
