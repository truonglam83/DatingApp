import { MigrationInterface, QueryRunner } from "typeorm";

export class alterTableNoti1680358200500 implements MigrationInterface {
    name = 'alterTableNoti1680358200500'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_e49359250c5862ee366c0322450"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "match_user_id"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "matched_user_id"`);
        await queryRunner.query(`ALTER TABLE "notification" ADD "match_user" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "notification" ADD "matched_user" uuid`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_1fead589cb6cbc02659b3b6620f" FOREIGN KEY ("matched_user") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_1fead589cb6cbc02659b3b6620f"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "matched_user"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "match_user"`);
        await queryRunner.query(`ALTER TABLE "notification" ADD "matched_user_id" uuid`);
        await queryRunner.query(`ALTER TABLE "notification" ADD "match_user_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_e49359250c5862ee366c0322450" FOREIGN KEY ("matched_user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
