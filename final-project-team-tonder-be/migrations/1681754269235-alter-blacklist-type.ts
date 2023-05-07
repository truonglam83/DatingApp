import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterBlacklistType1681754269235 implements MigrationInterface {
    name = 'AlterBlacklistType1681754269235'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "black_list"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "black_list" text array NOT NULL DEFAULT '{}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "black_list"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "black_list" json`);
    }

}
