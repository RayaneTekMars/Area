import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";

@Injectable()
export class SpotifySubscribeService {
  private readonly spotifyOAuthUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.spotifyOAuthUrl = "https://accounts.spotify.com/authorize";
  }

  getAuthorizeUrl(): string {
    const clientId: string = this.configService.get("SPOTIFY_OAUTH2_CLIENT_ID")!;
    const redirectUri: string = this.configService.get("SPOTIFY_OAUTH2_CALLBACK_URL")!;

    return `${this.spotifyOAuthUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=user-read-currently-playing`;
  }

  async authorize(code: string): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const clientId = this.configService.get("SPOTIFY_OAUTH2_CLIENT_ID");
    const clientSecret = this.configService.get("SPOTIFY_OAUTH2_CLIENT_SECRET");
    const redirectUri = this.configService.get("SPOTIFY_OAUTH2_CALLBACK_URL");
    const authHeader = (new (Buffer as any).from(clientId + ':' + clientSecret).toString('base64'));

    const data = {
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
      code,
    }

    try {
      const response = await axios.post(
        'https://accounts.spotify.com/api/token',
        data,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
            'Authorization': 'Basic ' + authHeader
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