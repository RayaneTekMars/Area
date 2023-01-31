import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TwitterApi } from 'twitter-api-v2';

@Injectable()
export class TwitterSubscribeService {

    twitterApi: TwitterApi;
    codeVerifierStateArray: Array<{ accountId: string, codeVerifier: string, state: string }>

    constructor(private readonly configService: ConfigService) {
        this.twitterApi = new TwitterApi({
            clientId: this.configService.get<string>('TWITTER_OAUTH2_CLIENT_ID')!,
            clientSecret: this.configService.get<string>('TWITTER_OAUTH2_CLIENT_SECRET'),
        });
        this.codeVerifierStateArray = [];
    }

    async getAuthorizeUrl(accountId: string) {
        const { url, codeVerifier, state } = this.twitterApi.generateOAuth2AuthLink(
            this.configService.get<string>('TWITTER_OAUTH2_CALLBACK_URL')!,
            { scope: ['tweet.read', 'tweet.write', 'users.read', 'follows.read', 'offline.access'] }
        );

        this.codeVerifierStateArray.push({ accountId, codeVerifier, state });

        return url;
    }

    async authorize(accountId: string, code: string) {
        const { codeVerifier } = this.codeVerifierStateArray.find(x => x.accountId === accountId)!;
        const { accessToken, refreshToken, expiresIn } = await this.twitterApi.loginWithOAuth2({
            code,
            redirectUri: this.configService.get<string>('TWITTER_OAUTH2_CALLBACK_URL')!,
            codeVerifier,
        });

        this.codeVerifierStateArray = this.codeVerifierStateArray.filter(x => x.accountId !== accountId);

        return { accessToken, refreshToken, expiresIn };
    }

    async refreshAccessToken(_refreshToken: string) {
        const { accessToken, refreshToken, expiresIn } = await this.twitterApi.refreshOAuth2Token(_refreshToken);

        return { accessToken, refreshToken, expiresIn };
    }

    async revokeAccessToken(refreshToken: string) {
        return await this.twitterApi.revokeOAuth2Token(refreshToken, 'refresh_token');
    }

}
