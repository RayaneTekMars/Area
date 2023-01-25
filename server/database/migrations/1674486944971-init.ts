import { MigrationInterface, QueryRunner } from "typeorm";

export class init1674486944971 implements MigrationInterface {
    name = 'init1674486944971'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "auth_token" ("id" character varying NOT NULL, "name" character varying NOT NULL, "lastActive" character varying NOT NULL, "expiresAt" character varying NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "accountId" character varying, CONSTRAINT "PK_4572ff5d1264c4a523f01aa86a0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "account" ("id" character varying NOT NULL, "username" character varying NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "google_credentials" ("id" character varying NOT NULL, "googleId" character varying NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "accountId" character varying, CONSTRAINT "REL_787fb7d4a7726c6d119593a93c" UNIQUE ("accountId"), CONSTRAINT "PK_7a6d9466fd05f8c23d7642a7b24" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "local_credentials" ("id" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "accountId" character varying, CONSTRAINT "REL_53fc3aa3ba65ac80dba21bb686" UNIQUE ("accountId"), CONSTRAINT "PK_e8da0c6c569b4c578a72fc6fc04" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "auth_token" ADD CONSTRAINT "FK_3d7910be62df26229e2d3b5a9ee" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "google_credentials" ADD CONSTRAINT "FK_787fb7d4a7726c6d119593a93c3" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "local_credentials" ADD CONSTRAINT "FK_53fc3aa3ba65ac80dba21bb6861" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "local_credentials" DROP CONSTRAINT "FK_53fc3aa3ba65ac80dba21bb6861"`);
        await queryRunner.query(`ALTER TABLE "google_credentials" DROP CONSTRAINT "FK_787fb7d4a7726c6d119593a93c3"`);
        await queryRunner.query(`ALTER TABLE "auth_token" DROP CONSTRAINT "FK_3d7910be62df26229e2d3b5a9ee"`);
        await queryRunner.query(`DROP TABLE "local_credentials"`);
        await queryRunner.query(`DROP TABLE "google_credentials"`);
        await queryRunner.query(`DROP TABLE "account"`);
        await queryRunner.query(`DROP TABLE "auth_token"`);
    }

}
