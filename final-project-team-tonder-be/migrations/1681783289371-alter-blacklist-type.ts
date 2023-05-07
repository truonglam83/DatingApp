import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterBlacklistType1681783289371 implements MigrationInterface {
    name = 'AlterBlacklistType1681783289371'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "black_list"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "black_list" json`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "black_list"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "black_list" text array NOT NULL DEFAULT '{}'`);
    }

}
