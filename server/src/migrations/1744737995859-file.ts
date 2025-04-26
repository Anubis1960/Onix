import {MigrationInterface, QueryRunner} from "typeorm";

export class FileVault1744737995859 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
                CREATE TABLE IF NOT EXISTS "file"
                (
                    "file_id"      uuid         NOT NULL DEFAULT uuid_generate_v4(),
                    "file_name"    varchar(255) NOT NULL,
                    "file_size"    int          NOT NULL,
                    "file_type"    varchar(255) NOT NULL,
                    "storage_path" varchar(255) NOT NULL,
                    "folder_id"    uuid         NOT NULL,
                    PRIMARY KEY ("file_id"),
                    FOREIGN KEY ("folder_id") REFERENCES public.folder (folder_id) ON DELETE CASCADE
                )
            `, undefined);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "file"`, undefined);
        await queryRunner.query(`DROP INDEX IF EXISTS "file_pkey"`, undefined);
        await queryRunner.query(`DROP INDEX IF EXISTS "file_folder_id_fkey"`, undefined);
    }

}
