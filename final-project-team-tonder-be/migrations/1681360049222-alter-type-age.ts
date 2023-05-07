import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTypeAge1681360049222 implements MigrationInterface {
    name = 'AlterTypeAge1681360049222'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "age"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "age" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "age"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "age" character varying`);
    }

}
