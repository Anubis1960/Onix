import {MigrationInterface, QueryRunner} from "typeorm";

export class FileShared1744738004683 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "shared_file"
            (
                "file_id"             UUID         NOT NULL DEFAULT uuid_generate_v4(),
                "file_name"           VARCHAR(100) NOT NULL,
                "file_size"           INT          NOT NULL,
                "file_type"           VARCHAR(255) NOT NULL,
                "storage_path"        VARCHAR(255) NOT NULL,
                "downloads_remaining" INT2         NOT NULL,
                "time_to_live"        INT2         NOT NULL,
                "created_at"          TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,

                PRIMARY KEY ("file_id")
            );
        `, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "shared_file"`, undefined);
        await queryRunner.query(`DROP INDEX IF EXISTS "shared_file_pkey"`, undefined);
    }

}
