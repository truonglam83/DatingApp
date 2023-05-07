import { MigrationInterface, QueryRunner } from "typeorm";

export class alterTableNoti1680358397731 implements MigrationInterface {
    name = 'alterTableNoti1680358397731'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_1fead589cb6cbc02659b3b6620f"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "matched_user"`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_6e1f5a01c20a63e4d3dcdc978e3" FOREIGN KEY ("match_user") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_6e1f5a01c20a63e4d3dcdc978e3"`);
        await queryRunner.query(`ALTER TABLE "notification" ADD "matched_user" uuid`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_1fead589cb6cbc02659b3b6620f" FOREIGN KEY ("matched_user") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
