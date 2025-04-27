import {MigrationInterface, QueryRunner} from "typeorm";
import path from "node:path";
import fs from "node:fs";

export class Folder1744737995859 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS public."folder"
            (
                "folder_id"   UUID         NOT NULL DEFAULT uuid_generate_v4(),
                "user_id"     UUID         NOT NULL,
                "folder_name" VARCHAR(255) NOT NULL,
                "parent_id"   UUID,

                PRIMARY KEY ("folder_id"),
                FOREIGN KEY ("user_id") REFERENCES public."user" ("user_id") ON DELETE CASCADE,
                FOREIGN KEY ("parent_id") REFERENCES public."folder" ("folder_id") ON DELETE CASCADE
            );
        `, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS folder`, undefined);
        await queryRunner.query(`DROP INDEX IF EXISTS folder_pkey`, undefined);
        await queryRunner.query(`DROP INDEX IF EXISTS folder_user_id_fkey`, undefined);
        await queryRunner.query(`DROP INDEX IF EXISTS folder_parent_id_fkey`, undefined);
    }

}
