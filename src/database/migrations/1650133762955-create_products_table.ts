import { MigrationInterface, QueryRunner } from 'typeorm';

export class createProductsTable1650133762955 implements MigrationInterface {
  name = 'createProductsTable1650133762955';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`products\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`ref\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`imageUrl\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`originalPrice\` decimal(20,2) NOT NULL, \`creditCardPrice\` decimal(20,2) NOT NULL, \`otherMethodPrice\` decimal(20,2) NOT NULL, \`provider\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`products\``);
  }
}
