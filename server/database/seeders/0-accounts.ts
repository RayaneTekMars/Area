import { faker } from '@faker-js/faker'
import { Account } from '../../src/accounts/entities/account.entity'
import { getSecureRandomString } from '../../src/common/helpers/random.helper'
import type { MigrationInterface, QueryRunner } from 'typeorm'

class AccountsSeeder implements MigrationInterface {
    name = 'AccountsSeeder'

    async up(queryRunner: QueryRunner): Promise<void> {
        const queryBuilder = queryRunner.manager.createQueryBuilder()

        const accounts = Array.from({ length: 30 }).map(() => ({
            id: getSecureRandomString(16),
            username: faker.name.firstName().toLowerCase(),
        }))

        await queryBuilder
            .insert()
            .into(Account)
            .values([
                {
                    id: getSecureRandomString(16),
                    username: faker.name.firstName().toLowerCase(),
                },
                {
                    id: getSecureRandomString(16),
                    username: 'AccTest',
                },
                ...accounts
            ])
            .execute()
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        const queryBuilder = queryRunner.manager.createQueryBuilder()
        await queryBuilder.delete()
            .from(Account)
            .execute()
    }

}

export {
    AccountsSeeder
}
