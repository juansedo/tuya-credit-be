import { MigrationInterface, QueryRunner } from 'typeorm';

export class addPermissionsColumnToUsers1652493770735 implements MigrationInterface {
  name = 'addPermissionsColumnToUsers1652493770735';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` ADD \`permissions\` set ('USER', 'ADMIN') NOT NULL DEFAULT 'USER'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`permissions\``);
  }
}
