import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { GoogleCredentials } from './entities/google-credentials.entity'
import { LocalCredentials } from './entities/local-credentials.entity'
import { GoogleApiService } from './services/google-api.service'
import { LocalCredentialsService } from './services/local-credentials.service'
import { AccountsService } from '../accounts/accounts.service'
import type { SignupReqDto } from './dto/signup.req.dto'
import type { Account } from '../accounts/entities/account.entity'

@Injectable()
class AuthService {

    constructor(
        @InjectRepository(GoogleCredentials)
        private readonly googleCredentialsRepository: Repository<GoogleCredentials>,
        @InjectRepository(LocalCredentials)
        private readonly localCredentialsRepository: Repository<LocalCredentials>,
        private readonly localCredentialsService: LocalCredentialsService,
        private readonly accountsService: AccountsService,
        private readonly googleApiService: GoogleApiService
    ) {}

    async signupWithLocalCredentials(body: SignupReqDto): Promise<Account> {

        const findAccountByEmail = await this.localCredentialsService.findByEmail(body.email)

        if (findAccountByEmail)
            throw new BadRequestException('The email is already used')

        const account = await this.accountsService.create(body)

        const localCredentials = this.localCredentialsRepository.create({
            ...body,
            account
        })

        await this.localCredentialsRepository.save(localCredentials)
        return account
    }

    async loginWithGoogleCode(code: string): Promise<Account> {

        const { id, name } = await this.googleApiService.getPersonFromCode(code)

        const foundCredentials = await this.googleCredentialsRepository.findOne({
            where: { googleId: id },
            relations: ['account']
        })

        if (foundCredentials)
            return foundCredentials.account

        const account = await this.accountsService.create({
            username: name
        })

        const googleCredentials = this.googleCredentialsRepository.create({
            googleId: id,
            account
        })

        await this.googleCredentialsRepository.save(googleCredentials)
        return account
    }

}

export {
    AuthService
}
