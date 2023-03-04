/* eslint-disable no-console */
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TwitterApi } from 'twitter-api-v2'
import { DateTime } from 'luxon'
import type Subscribe from './subscribe'

@Injectable()
export class TwitterSubscribeService implements Subscribe {

    private readonly clientId: string
    private readonly clientSecret: string
    private readonly redirectUri: string
    private readonly scope: string

    twitterApi: TwitterApi
    codeVerifierStateArray: Map<string, { codeVerifier: string, state: string }>

    constructor(private readonly configService: ConfigService) {
        this.clientId = this.configService.get<string>('TWITTER_OAUTH2_CLIENT_ID') ?? ''
        this.clientSecret = this.configService.get<string>('TWITTER_OAUTH2_CLIENT_SECRET') ?? ''
        this.redirectUri = this.configService.get<string>('TWITTER_OAUTH2_CALLBACK_URL') ?? ''
        this.scope = this.configService.get<string>('TWITTER_OAUTH2_SCOPE') ?? ''

        this.twitterApi = new TwitterApi({
            clientId: this.clientId,
            clientSecret: this.clientSecret
        })
        this.codeVerifierStateArray = new Map()
    }

    getAuthorizeUrl(accountId: string) {
        try {
            const { url, codeVerifier, state } = this.twitterApi.generateOAuth2AuthLink(
                this.redirectUri,
                {
                    scope: this.scope.split(' ')
                }
            )

            this.codeVerifierStateArray.set(accountId, { codeVerifier, state })

            return url
        } catch (error) {
            console.error(error)
            throw new Error('Error while generating OAuth2 auth link')
        }
    }

    async authorize(code: string, accountId: string) {
        try {
            const { codeVerifier } = this.codeVerifierStateArray.get(accountId) ?? {
                codeVerifier: ''
            }

            let { accessToken, refreshToken, expiresIn }
                = await this.twitterApi.loginWithOAuth2({
                    code,
                    redirectUri: this.redirectUri,
                    codeVerifier
                })

            this.codeVerifierStateArray.delete(accountId)

            refreshToken ??= ''

            return {
                accessToken,
                refreshToken,
                expiresAt: DateTime.now().plus({ seconds: Number(expiresIn) })
                    .toISO()
            }
        } catch (error) {
            console.error(error)
            throw new Error('Error while getting access token')
        }
    }

    async refreshAccessToken(refreshToken: string) {
        try {
            const { accessToken, refreshToken: newRefreshToken, expiresIn }
                = await this.twitterApi.refreshOAuth2Token(refreshToken)

            return {
                accessToken,
                newRefreshToken: newRefreshToken ?? refreshToken,
                expiresAt: DateTime.now().plus({ seconds: Number(expiresIn) })
                    .toISO()
            }
        } catch (error) {
            console.error(error)
            throw new Error('Error while refreshing access token')
        }
    }

    async revokeAccessToken(refreshToken: string) {
        try {
            await this.twitterApi.revokeOAuth2Token(refreshToken, 'refresh_token')
        } catch (error) {
            console.error(error)
            throw new Error('Error while revoking access token')
        }
    }
}
