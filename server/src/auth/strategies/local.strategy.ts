import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { LocalCredentialsService } from '../services/local-credentials.service'
import type { Account } from '../../accounts/entities/account.entity'

@Injectable()
class LocalStrategy extends PassportStrategy(Strategy) {

    constructor(
        private readonly localCredentialsService: LocalCredentialsService
    ) {
        super({
            usernameField: 'email',
            passwordField: 'password'
        })
    }

    async validate(email: string, password: string): Promise<Account> {

        const account = await this.localCredentialsService.validate(email, password)

        if (account === undefined)
            throw new UnauthorizedException()

        return account
    }

}

export {
    LocalStrategy
}
