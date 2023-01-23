import { GoogleCredentials } from '../../src/auth/entities/google-credentials.entity'
import type { MigrationInterface, QueryRunner } from 'typeorm'

class GoogleCredentialsSeeder implements MigrationInterface {

    public name = 'GoogleCredentialsSeeder'

    public up(): Promise<void> {
        return Promise.resolve()
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.createQueryBuilder()
            .delete()
            .from(GoogleCredentials)
            .execute()
    }

}

export {
    GoogleCredentialsSeeder
}
