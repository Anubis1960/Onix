import {MigrationInterface, QueryRunner} from "typeorm";

export class FileVault1744737995859 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
                CREATE TABLE "file_vault"
                (
                    "file_id"    uuid                   NOT NULL DEFAULT uuid_generate_v4(),
                    "user_id"    uuid                   NOT NULL,
                    "name"       character varying(255) NOT NULL,
                    "size"       int                    NOT NULL,
                    "path"       character varying(255) NOT NULL,
                    "created_at" timestamp                       DEFAULT CURRENT_TIMESTAMP NOT NULL,
                    PRIMARY KEY ("file_id"),
                    FOREIGN KEY ("user_id") REFERENCES public."user" ("user_id") ON DELETE CASCADE
                )
            `, undefined);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "file_vault"`, undefined);
        await queryRunner.query(`DROP INDEX IF EXISTS "file_vault_pkey"`, undefined);
    }

}
