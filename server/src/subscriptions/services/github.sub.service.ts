import { URLSearchParams } from "url";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import fetch from 'node-fetch'
import axios from "axios";

@Injectable()
export class GithubSubscribeService {
  private readonly githubOAuthUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.githubOAuthUrl = "https://github.com/login/oauth";
  }

  getAuthorizeUrl(): string {
    const clientId: string = this.configService.get("GITHUB_OAUTH2_CLIENT_ID")!;
    const redirectUri: string = this.configService.get(
      "GITHUB_OAUTH2_CALLBACK_URL"
    )!;
    const scopes: string[] = ["repo", "repo:status", "user:follow"];
    return `${
      this.githubOAuthUrl
    }/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
      " "
    )}`;
  }

  async authorize(code: string): Promise<{
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  }> {
    const clientId = this.configService.get("GITHUB_OAUTH2_CLIENT_ID");
    const clientSecret = this.configService.get("GITHUB_OAUTH2_CLIENT_SECRET");
    const redirectUri = this.configService.get("GITHUB_OAUTH2_CALLBACK_URL");

    const identity = Buffer.from(clientId + ":" + clientSecret).toString('base64')

    const data = new URLSearchParams();
    data.append("code", code);
    data.append("redirectUri", redirectUri);
    data.append("grant_type", "authorization_code");

    let res = await fetch(`${this.githubOAuthUrl}/access_token`, {
      method: "POST",
      body: data.toString(),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Basic ${identity}`,
      },
    });

    let response = {
      accessToken: "",
      refreshToken: "",
      expiresIn: 0,
    };

    if (res.status !== 200) {
      throw new Error("Error while getting access token");
    } else {

      res = await res.json();

      response.accessToken = res.access_token;
      response.refreshToken = res.refresh_token;
      response.expiresIn = res.expires_in;
    }

    return response;
  }

  async refreshAccessToken(refreshToken: string): Promise<string> {
    const clientId = this.configService.get("GITHUB_OAUTH2_CLIENT_ID");
    const clientSecret = this.configService.get("GITHUB_OAUTH2_CLIENT_SECRET");

    const response = await axios.post(
      `${this.githubOAuthUrl}/access_token`,
      {
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: "refresh_token",
      },
      {
        headers: {
          accept: "application/json",
        },
      }
    );

    const accessToken = response.data.access_token;

    /*
     * Update the access token in the database or somewhere else
     * ...
     */

    return accessToken;
  }

  async revokeAccessToken(refreshToken: string): Promise<void> {
    const clientId = this.configService.get("GITHUB_OAUTH2_CLIENT_ID");
    const clientSecret = this.configService.get("GITHUB_OAUTH2_CLIENT_SECRET");

    await axios.post(
      `${this.githubOAuthUrl}/revoke`,
      {
        client_id: clientId,
        client_secret: clientSecret,
        token: refreshToken,
      },
      {
        headers: {
          accept: "application/json",
        },
      }
    );

    /*
     * Delete the tokens from the database or somewhere else
     * ...
     */
  }
}
