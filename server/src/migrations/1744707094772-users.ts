import {MigrationInterface, QueryRunner} from "typeorm";

export class Users1744707094772 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
                CREATE TABLE "user"
                (
                    "user_id"  SERIAL                 NOT NULL,
                    "email"    character varying(100) NOT NULL,
                    "password" character varying(512) NOT NULL,
                    "salt"     character varying(255) NOT NULL,
                    CONSTRAINT "UQ_8a4c6f8d2f5e9b8c3a7e0f5d3c4" UNIQUE ("email"),
                    CONSTRAINT "PK_8a4c6f8d2f5e9b8c3a7e0f5d3c4" PRIMARY KEY ("user_id")
                )
            `, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`, undefined);
    }

}
