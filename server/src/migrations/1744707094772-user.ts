import {MigrationInterface, QueryRunner} from "typeorm";

export class Users1744707094772 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
                CREATE TABLE "user"
                (
                    "user_id"  uuid                   NOT NULL DEFAULT uuid_generate_v4(),
                    "email"    character varying(100) NOT NULL,
                    "password" character varying(511) NOT NULL,
                    UNIQUE ("email"),
                    PRIMARY KEY ("user_id")
                )
            `, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "user"`, undefined);
        await queryRunner.query(`DROP INDEX IF EXISTS "user_email_key"`, undefined);
        await queryRunner.query(`DROP INDEX IF EXISTS "user_pkey"`, undefined);
    }

}
