import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Account } from '../../accounts/entities/account.entity'
import { AuthToken } from '../../token/entities/auth-token.entity'
import type { FullJwtContent } from '../../token/types/jwt.type'

@Injectable()
class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectRepository(Account)
        private readonly accountRepository: Repository<Account>,
        @InjectRepository(AuthToken)
        private readonly authTokenRepository: Repository<AuthToken>,
        private readonly configService: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET') ?? 'secret'
        })
    }

    async validate(payload: FullJwtContent): Promise<Account> {

        const account = await this.accountRepository.findOneBy({ id: payload.sub })
        const authToken = await this.authTokenRepository.findOneBy({ id: payload.jti })

        if (account === null || authToken === null)
            throw new UnauthorizedException()

        authToken.lastActive = new Date().toISOString()
        await this.authTokenRepository.save(authToken)

        return account
    }

}

export {
    JwtStrategy
}
