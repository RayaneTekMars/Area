import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TwitterApi } from "twitter-api-v2";

@Injectable()
export class TwitterSubscribeService {
  twitterApi: TwitterApi;
  codeVerifierStateArray: Map<string, { codeVerifier: string; state: string }>;

  constructor(private readonly configService: ConfigService) {
    this.twitterApi = new TwitterApi({
      clientId:
        this.configService.get<string>("TWITTER_OAUTH2_CLIENT_ID") ?? "",
      clientSecret:
        this.configService.get<string>("TWITTER_OAUTH2_CLIENT_SECRET") ?? "",
    });
    this.codeVerifierStateArray = new Map();
  }

  getAuthorizeUrl(accountId: string) {
    const { url, codeVerifier, state } = this.twitterApi.generateOAuth2AuthLink(
      this.configService.get<string>("TWITTER_OAUTH2_CALLBACK_URL") ?? "",
      {
        scope: [
          "tweet.read",
          "tweet.write",
          "users.read",
          "follows.read",
          "offline.access",
        ],
      }
    );

    this.codeVerifierStateArray.set(accountId, { codeVerifier, state });

    return url;
  }

  async authorize(accountId: string, code: string) {
    const { codeVerifier } = this.codeVerifierStateArray.get(accountId) ?? {
      codeVerifier: "",
    };
    const { accessToken, refreshToken, expiresIn } =
      await this.twitterApi.loginWithOAuth2({
        code,
        redirectUri:
          this.configService.get<string>("TWITTER_OAUTH2_CALLBACK_URL") ?? "",
        codeVerifier,
      });

    this.codeVerifierStateArray.delete(accountId);

    return { accessToken, refreshToken, expiresIn };
  }

  async refreshAccessToken(_refreshToken: string) {
    const { accessToken, refreshToken, expiresIn } =
      await this.twitterApi.refreshOAuth2Token(_refreshToken);

    return { accessToken, refreshToken, expiresIn };
  }

  async revokeAccessToken(refreshToken: string) {
    await this.twitterApi.revokeOAuth2Token(refreshToken, "refresh_token");
  }
}
