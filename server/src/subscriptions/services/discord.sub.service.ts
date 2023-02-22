import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";

@Injectable()
export class DiscordSubscribeService {
  private readonly discordOAuthUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.discordOAuthUrl = "https://discord.com/oauth2/authorize";
  }

  getAuthorizeUrl(): string {
    const clientId: string = this.configService.get("DISCORD_OAUTH2_CLIENT_ID")!;
    const redirectUri: string = this.configService.get("DISCORD_OAUTH2_CALLBACK_URL")!;

    return `${this.discordOAuthUrl}?client_id=${clientId}&permissions=3072&redirect_uri=${redirectUri}&response_type=code&scope=identify%20bot`;
  }

  async authorize(code: string): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const clientId = this.configService.get("DISCORD_OAUTH2_CLIENT_ID");
    const clientSecret = this.configService.get("DISCORD_OAUTH2_CLIENT_SECRET");
    const redirectUri = this.configService.get("DISCORD_OAUTH2_CALLBACK_URL");

    const data = {
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
      code,
    }

    try {
      const response = await axios.post(
        'https://discord.com/api/v10/oauth2/token',
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