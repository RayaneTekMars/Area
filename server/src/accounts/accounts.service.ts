import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Account } from './entities/account.entity'
import type { CreateAccountReqDto } from './dto/create-account.req.dto'

@Injectable()
class AccountsService {

    constructor(
        @InjectRepository(Account)
        private readonly accountRepository: Repository<Account>
    ) {}

    async create(body: CreateAccountReqDto): Promise<Account> {

        const account = this.accountRepository.create({
            ...body
        })

        return this.accountRepository.save(account)
    }

    async findById(subjectId: string): Promise<Account> {

        const account = await this.accountRepository.findOne({
            where: { id: subjectId }
        })

        if (account === null)
            throw new NotFoundException()

        return account
    }
}

export {
    AccountsService
}
