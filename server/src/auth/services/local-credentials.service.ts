import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import bcrypt from 'bcrypt'
import { Repository } from 'typeorm'
import { LocalCredentials } from '../entities/local-credentials.entity'
import type { Account } from '../../accounts/entities/account.entity'

@Injectable()
class LocalCredentialsService {

    constructor(
        @InjectRepository(LocalCredentials)
        private readonly localCredentialsRepository: Repository<LocalCredentials>
    ) {}

    async findByEmail(email: string): Promise<LocalCredentials | null> {
        return this.localCredentialsRepository.findOneBy({ email })
    }

    async validate(email: string, password: string): Promise<Account | undefined> {

        const localCredentials = await this.localCredentialsRepository.findOne({
            where: { email },
            relations: ['account']
        })

        if (localCredentials === null)
            return undefined

        const isSamePassword = await bcrypt.compare(password, localCredentials.password)

        if (!isSamePassword)
            return undefined

        return localCredentials.account
    }

}

export {
    LocalCredentialsService
}
