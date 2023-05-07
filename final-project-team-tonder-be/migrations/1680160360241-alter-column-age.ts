import { MigrationInterface, QueryRunner } from "typeorm";

export class alterColumnAge1680160360241 implements MigrationInterface {
    name = 'alterColumnAge1680160360241'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "age"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "age" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "age"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "age" TIMESTAMP`);
    }

}
