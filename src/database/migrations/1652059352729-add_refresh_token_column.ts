import { MigrationInterface, QueryRunner } from 'typeorm';

export class addRefreshTokenColumn1652059352729 implements MigrationInterface {
  name = 'addRefreshTokenColumn1652059352729';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` ADD \`refreshToken\` varchar(255) NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`refreshToken\``);
  }
}
