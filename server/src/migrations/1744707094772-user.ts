import {MigrationInterface, QueryRunner} from "typeorm";
import path from "node:path";
import fs from "node:fs";

export class Users1744707094772 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "user"
            (
                "user_id"  UUID         NOT NULL DEFAULT uuid_generate_v4(),
                "email"    VARCHAR(100) NOT NULL,
                "password" VARCHAR(511) NOT NULL,

                UNIQUE ("email"),
                PRIMARY KEY ("user_id")
            );
        `, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "user"`, undefined);
        await queryRunner.query(`DROP INDEX IF EXISTS "user_email_key"`, undefined);
        await queryRunner.query(`DROP INDEX IF EXISTS "user_pkey"`, undefined);
    }

}
