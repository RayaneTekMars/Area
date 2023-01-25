interface JwtPayload {
    jti: string
    sub: string
}

interface FullJwtContent extends JwtPayload {
    iat: string
    exp: string
}

export type {
    JwtPayload,
    FullJwtContent
}
