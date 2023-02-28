import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TwitterApi } from 'twitter-api-v2'

@Injectable()
export class TwitterSubscribeService {

    private readonly clientId: string
    private readonly clientSecret: string
    private readonly redirectUrl: string

    twitterApi: TwitterApi
    codeVerifierStateArray: Map<string, { codeVerifier: string, state: string }>

    constructor(private readonly configService: ConfigService) {
        this.clientId = this.configService.get<string>('TWITTER_OAUTH2_CLIENT_ID') ?? ''
        this.clientSecret = this.configService.get<string>('TWITTER_OAUTH2_CLIENT_SECRET') ?? ''
        this.redirectUrl = this.configService.get<string>('TWITTER_OAUTH2_CALLBACK_URL') ?? ''

        this.twitterApi = new TwitterApi({
            clientId: this.clientId,
            clientSecret: this.clientSecret
        })
        this.codeVerifierStateArray = new Map()
    }

    getAuthorizeUrl(accountId: string) {
        const { url, codeVerifier, state } = this.twitterApi.generateOAuth2AuthLink(
            this.redirectUrl,
            {
                scope: [
                    'tweet.read',
                    'tweet.write',
                    'users.read',
                    'follows.read',
                    'offline.access'
                ]
            }
        )

        console.log('Twitter: getAuthorizeUrl', codeVerifier, state)

        this.codeVerifierStateArray.set(accountId, { codeVerifier, state })

        return url
    }

    async authorize(accountId: string, code: string) {
        const { codeVerifier } = this.codeVerifierStateArray.get(accountId) ?? {
            codeVerifier: ''
        }

        console.log('Twitter: authorize', codeVerifier, code)

        let { accessToken, refreshToken, expiresIn }
            = await this.twitterApi.loginWithOAuth2({
                code,
                redirectUri: this.redirectUrl,
                codeVerifier
            })

        this.codeVerifierStateArray.delete(accountId)

        refreshToken ??= ''

        return { accessToken, refreshToken, expiresIn }
    }

    async refreshAccessToken(_refreshToken: string) {
        const { accessToken, refreshToken, expiresIn }
            = await this.twitterApi.refreshOAuth2Token(_refreshToken)

        if (refreshToken === undefined)
            throw new Error('Refresh token is not provided')

        return { accessToken, refreshToken, expiresIn }
    }

    async revokeAccessToken(refreshToken: string) {
        await this.twitterApi.revokeOAuth2Token(refreshToken, 'refresh_token')
    }
}
