/* eslint-disable unicorn/no-null */
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Octokit } from '@octokit/core'
import { createOAuthAppAuth } from '@octokit/auth-oauth-app'
import type { OAuthAppUserAuthentication } from '@octokit/auth-oauth-app'
import type Subscribe from './subscribe'

@Injectable()
export class GithubSubscribeService implements Subscribe {

    private readonly clientId: string
    private readonly clientSecret: string
    private readonly redirectUrl: string
    private readonly scope: string

    private readonly githubOAuthUrl: string

    private octokit: Octokit

    constructor(private readonly configService: ConfigService) {
        this.clientId = this.configService.get('GITHUB_OAUTH2_CLIENT_ID') ?? ''
        this.clientSecret = this.configService.get('GITHUB_OAUTH2_CLIENT_SECRET') ?? ''
        this.redirectUrl = this.configService.get('GITHUB_OAUTH2_CALLBACK_URL') ?? ''
        this.scope = this.configService.get('GITHUB_OAUTH2_SCOPE') ?? ''
        this.githubOAuthUrl = 'https://github.com/login/oauth'

        this.octokit = new Octokit({
            authStrategy: createOAuthAppAuth,
            auth: {
                clientId: this.clientId,
                clientSecret: this.clientSecret
            }
        })
    }

    getAuthorizeUrl() {
        return `${this.githubOAuthUrl}/authorize?client_id=${this.clientId}&redirect_uri=${this.redirectUrl}&scope=${encodeURIComponent(this.scope)}`
    }

    async authorize(code: string) {
        const userAuth = await this.octokit.auth({
            type: 'oauth-user',
            code,
            redirectUrl: this.redirectUrl
        }) as OAuthAppUserAuthentication

        return {
            accessToken: userAuth.token,
            refreshToken: '',
            expiresAt: null
        }
    }

    async refreshAccessToken(refreshToken: string, accessToken: string) {
        void refreshToken

        const response = await this.octokit.request('PATCH /applications/{client_id}/token', {
            client_id: this.clientId,
            access_token: accessToken
        })

        return {
            accessToken: response.data.token,
            newRefreshToken: '',
            expiresAt: null
        }
    }

    async revokeAccessToken(refreshToken: string, accessToken: string) {
        await this.octokit.request('DELETE /applications/{client_id}/token', {
            client_id: this.clientId,
            access_token: accessToken
        })
    }
}
