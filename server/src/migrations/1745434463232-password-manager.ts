import {MigrationInterface, QueryRunner} from "typeorm";
import path from "node:path";
import fs from "node:fs";

export class PasswordManager1745434463232 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE public."password_manager"
            (
                "password_id" UUID         NOT NULL DEFAULT uuid_generate_v4(),
                "user_id"     UUID         NOT NULL,
                "domain"      VARCHAR(255) NOT NULL,
                "username"    VARCHAR(255) NOT NULL,
                "password"    VARCHAR(255) NOT NULL,
                PRIMARY KEY ("password_id"),
                FOREIGN KEY ("user_id") REFERENCES public."user" ("user_id") ON DELETE CASCADE
            );
        `, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "password_manager"`, undefined);
        await queryRunner.query(`DROP INDEX IF EXISTS "password_manager_pkey"`, undefined);
    }

}
