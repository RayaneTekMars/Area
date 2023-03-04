import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'
import ms from 'ms'
import { Repository } from 'typeorm'
import { AuthToken } from './entities/auth-token.entity'
import type { JwtPayload } from './types/jwt.type'
import type { Account } from '../about/accounts/entities/account.entity'

interface AuthTokenAndJwt {
    authToken: AuthToken
    bearerToken: string
}

@Injectable()
class TokenService {

    constructor(
        @InjectRepository(AuthToken)
        private readonly authTokenRepository: Repository<AuthToken>,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService
    ) {}

    async create(name: string, initiator: Account): Promise<AuthTokenAndJwt> {

        const expiresAt = this.getExpirationDate()

        const authToken = await this.createAuthToken(name, initiator, expiresAt)
        const bearerToken = this.createBearerToken(authToken, expiresAt)

        return {
            authToken,
            bearerToken
        }
    }

    async getAllAuthTokensForAccount(subject: Account): Promise<AuthToken[]> {

        const authTokens = await this.authTokenRepository.find({
            where: {
                account: {
                    id: subject.id
                }
            },
            relations: ['account']
        })

        return authTokens
    }

    async deleteAuthToken(subjectId: string, initiator: Account): Promise<void> {

        const authToken = await this.authTokenRepository.findOne({
            where: {
                id: subjectId
            },
            relations: ['account']
        })

        if (authToken === null)
            throw new NotFoundException()

        if (authToken.account.id !== initiator.id)
            throw new ForbiddenException()

        await this.authTokenRepository.remove(authToken)
    }

    private createAuthToken(name: string, account: Account, expiresAt: Date): Promise<AuthToken> {

        const authToken = new AuthToken()

        authToken.name = name
        authToken.account = account
        authToken.expiresAt = expiresAt.toISOString()

        return this.authTokenRepository.save(authToken)
    }

    private createBearerToken(authToken: AuthToken, expiresAt: Date): string {

        const payload: JwtPayload = {
            jti: authToken.id,
            sub: authToken.account.id
        }

        return this.jwtService.sign(payload, {
            expiresIn: ms(expiresAt.getTime() - Date.now())
        })
    }

    private getExpirationDate(): Date {
        const expiresIn = ms(this.configService.get<string>('JWT_OPTION_EXPIRES_IN') ?? '1h')
        return new Date(Date.now() + expiresIn)
    }

}

export {
    TokenService
}
