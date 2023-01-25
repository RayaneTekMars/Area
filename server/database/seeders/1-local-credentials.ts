/* eslint-disable @typescript-eslint/no-non-null-assertion */
import bcrypt from 'bcrypt'
import { faker } from '@faker-js/faker'
import { LocalCredentials } from '../../src/auth/entities/local-credentials.entity'
import { Account } from '../../src/accounts/entities/account.entity'
import { getSecureRandomString } from '../../src/common/helpers/random.helper'
import type { MigrationInterface, QueryRunner } from 'typeorm'

class LocalCredentialsSeeder implements MigrationInterface {
    name = 'LocalCredentialsSeeder'

    async up(queryRunner: QueryRunner): Promise<void> {
        const queryBuilder = queryRunner.manager.createQueryBuilder()

        const [...accounts] = await queryBuilder.select('account').from(Account, 'account').getMany()
        const password = await bcrypt.hash('password', 12)

        await queryBuilder
            .insert()
            .into(LocalCredentials)
            .values([
                {
                    id: getSecureRandomString(16),
                    email: 'admin@example.com',
                    password
                }, {
                    id: getSecureRandomString(16),
                    email: 'test@amm.com',
                    password
                }
            ])
            .execute()

        await queryBuilder
            .insert()
            .into(LocalCredentials)
            .values(accounts.map((account) => ({
                id: getSecureRandomString(16),
                email: faker.internet.email(),
                password,
                account
            })))
            .execute()
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        const queryBuilder = queryRunner.manager.createQueryBuilder()
        await queryBuilder.delete()
            .from(LocalCredentials)
            .execute()
    }

}

export {
    LocalCredentialsSeeder
}
