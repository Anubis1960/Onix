import {MigrationInterface, QueryRunner} from "typeorm";

export class FileShared1744738004683 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
                CREATE TABLE "file_shared"
                (
                    "file_id"             BIGSERIAL                           NOT NULL,
                    "name"                character varying(255)              NOT NULL,
                    "size"                int                                 NOT NULL,
                    "path"                character varying(255)              NOT NULL,
                    "downloads_remaining" int2                                NOT NULL,
                    "time_to_live"        int2                                NOT NULL,
                    "created_at"          timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
                    PRIMARY KEY ("file_id")
                )
            `, undefined);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "file_shared"`, undefined);
    }

}
