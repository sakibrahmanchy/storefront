import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateSalesTable1634130133643 implements MigrationInterface {
  name = 'UpdateSalesTable1634130133643';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`sale\` ADD \`productId\` int NULL`);
    await queryRunner.query(
      `ALTER TABLE \`customer\` DROP COLUMN \`customer_contact\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`customer\` ADD \`customer_contact\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sale\` ADD CONSTRAINT \`FK_a0a99bbb3f0ae6ecea2abc7393b\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`sale\` DROP FOREIGN KEY \`FK_a0a99bbb3f0ae6ecea2abc7393b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`customer\` DROP COLUMN \`customer_contact\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`customer\` ADD \`customer_contact\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`sale\` DROP COLUMN \`productId\``);
  }
}
