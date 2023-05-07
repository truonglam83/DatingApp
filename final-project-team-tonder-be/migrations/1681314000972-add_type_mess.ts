import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTypeMess1681314000972 implements MigrationInterface {
  name = 'AddTypeMess1681314000972';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "message" ADD "type" character varying NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "type"`);
  }
}
