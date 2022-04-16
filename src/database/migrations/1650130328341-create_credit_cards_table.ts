import { MigrationInterface, QueryRunner } from 'typeorm';

export class createCreditCardsTable1650130328341 implements MigrationInterface {
  name = 'createCreditCardsTable1650130328341';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`credit_cards\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` varchar(255) NOT NULL, \`lastDigits\` char(4) NOT NULL, \`fee\` decimal(6,2) NOT NULL, \`feeMode\` varchar(255) NOT NULL, \`capacity\` decimal(15,2) NOT NULL, \`available\` decimal(15,2) NOT NULL, \`interestRate\` decimal(5,4) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`credit_cards\``);
  }
}
