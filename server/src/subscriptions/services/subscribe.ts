interface AuthorizeResponse {
    accessToken: string
    refreshToken: string
    expiresAt: string | null
}

interface RefreshResponse {
    accessToken: string
    newRefreshToken: string
    expiresAt: string | null
}

abstract class Subscribe {

    abstract getAuthorizeUrl(accountId: string): string

    abstract authorize(code: string, accountId: string): Promise<AuthorizeResponse>

    abstract refreshAccessToken(refreshToken: string, accessToken: string): Promise<RefreshResponse>

    abstract revokeAccessToken(refreshToken: string, accessToken: string): Promise<void>

}

export default Subscribe
export type { AuthorizeResponse, RefreshResponse }
