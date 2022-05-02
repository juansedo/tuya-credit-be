import { MigrationInterface, QueryRunner } from 'typeorm';

export class userDocumentUniqueConstraint1650289943592 implements MigrationInterface {
  name = 'userDocumentUniqueConstraint1650289943592';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_c1b20b2a1883ed106c3e746c25\` (\`document\`)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` DROP INDEX \`IDX_c1b20b2a1883ed106c3e746c25\``);
  }
}
