import {MigrationInterface, QueryRunner} from "typeorm";

export class Users1744707094772 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
                CREATE TABLE "user"
                (
                    "user_id"  BIGSERIAL              NOT NULL,
                    "email"    character varying(100) NOT NULL,
                    "password" character varying(512) NOT NULL,
                    "salt"     character varying(255) NOT NULL,
                    UNIQUE ("email"),
                    PRIMARY KEY ("user_id")
                )
            `, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`, undefined);
    }

}
