import {MigrationInterface, QueryRunner} from "typeorm";
import * as path from "node:path";
import * as fs from "node:fs";


export class FileVault1745609358612 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS public."file"
            (
                "file_id"      UUID         NOT NULL DEFAULT uuid_generate_v4(),
                "file_name"    VARCHAR(100) NOT NULL,
                "file_size"    INT          NOT NULL,
                "file_type"    VARCHAR(255) NOT NULL,
                "storage_path" VARCHAR(255) NOT NULL,
                "folder_id"    UUID         NOT NULL,

                PRIMARY KEY ("file_id"),
                FOREIGN KEY ("folder_id") REFERENCES public."folder" ("folder_id") ON DELETE CASCADE
            );
        `, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "file"`, undefined);
        await queryRunner.query(`DROP INDEX IF EXISTS "file_pkey"`, undefined);
        await queryRunner.query(`DROP INDEX IF EXISTS "file_folder_id_fkey"`, undefined);
    }

}
