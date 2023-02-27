import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";

@Injectable()
export class TwitchSubscribeService {

  private readonly twitchOAuthUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.twitchOAuthUrl = "https://id.twitch.tv/oauth2";
  }

  getAuthorizeUrl(): string {
    const clientId: string = this.configService.get("TWITCH_OAUTH2_CLIENT_ID")!;
    const redirectUri: string = this.configService.get("TWITCH_OAUTH2_CALLBACK_URL")!;

    return `${this.twitchOAuthUrl}/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=channel%3Aread%3Asubscriptions`;
  }

  async authorize(code: string): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const clientId = this.configService.get("TWITCH_OAUTH2_CLIENT_ID");
    const clientSecret = this.configService.get("TWITCH_OAUTH2_CLIENT_SECRET");
    const redirectUri = this.configService.get("TWITCH_OAUTH2_CALLBACK_URL");

    const data = {
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
      code,
    }

    try {
      const response = await axios.post(
        `${this.twitchOAuthUrl}/token`,
        data,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      console.log(response.data);

      return {
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token
      };
    } catch (error) {
      throw new Error("Error while getting access token");
    }
  }
}
