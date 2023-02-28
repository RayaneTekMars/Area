import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Octokit } from '@octokit/core'
import axios from 'axios'

@Injectable()
export class GithubSubscribeService {

  private readonly scope: string
  private readonly clientId: string
  private readonly clientSecret: string
  private readonly redirectUri: string
  private readonly githubOAuthUrl: string

  private octokit: Octokit

  constructor(private readonly configService: ConfigService) {
    this.scope = this.configService.get('GITHUB_OAUTH2_SCOPE') ?? ''
    this.clientId = this.configService.get('GITHUB_OAUTH2_CLIENT_ID') ?? ''
    this.clientSecret = this.configService.get('GITHUB_OAUTH2_CLIENT_SECRET') ?? ''
    this.redirectUri = this.configService.get('GITHUB_OAUTH2_CALLBACK_URL') ?? ''
    this.githubOAuthUrl = 'https://github.com/login/oauth'
    this.octokit = new Octokit({
      auth: this.clientSecret
    })
  }

  getAuthorizeUrl(): string {
    return `${this.githubOAuthUrl}/authorize?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&scope=${this.scope}`
  }

  async authorize(code: string): Promise<{
    accessToken: string
  }> {
    const response = await axios.post(`${this.githubOAuthUrl}/access_token`, {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      code,
      redirect_uri: this.redirectUri
    }, {
      headers: {
        Accept: 'application/json'
      }
    })

    return {
      accessToken: response.data.access_token
    }
  }

  async refreshAccessToken(accessToken: string): Promise<{
    accessToken: string
  }> {
    const response = await this.octokit.request('PATCH /applications/{client_id}/token', {
      client_id: this.clientId,
      access_token: accessToken
    })

    return {
      accessToken: response.data.token
    }
  }

  async revokeAccessToken(accessToken: string): Promise<void> {
    await this.octokit.request('DELETE /applications/{client_id}/token', {
      client_id: this.clientId,
      access_token: accessToken
    })
  }
}
