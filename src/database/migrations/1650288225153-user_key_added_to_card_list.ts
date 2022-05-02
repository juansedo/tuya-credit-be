import { MigrationInterface, QueryRunner } from 'typeorm';

export class userKeyAddedToCardList1650288225153 implements MigrationInterface {
  name = 'userKeyAddedToCardList1650288225153';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`credit_cards\` ADD \`userKey\` varchar(255) NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`credit_cards\` DROP COLUMN \`userKey\``);
  }
}
