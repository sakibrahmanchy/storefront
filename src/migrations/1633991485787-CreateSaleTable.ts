import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSaleTable1633991485787 implements MigrationInterface {
  name = 'CreateSaleTable1633991485787';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`sale\` (\`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`id\` int NOT NULL AUTO_INCREMENT, \`discount_percentage\` double NOT NULL, \`price\` double NOT NULL, \`customerId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`inventory\` ADD \`saleId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`inventory\` ADD CONSTRAINT \`FK_798ab782f9f63e985026be4e408\` FOREIGN KEY (\`saleId\`) REFERENCES \`sale\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sale\` ADD CONSTRAINT \`FK_a742b91c1b99a4269c102d47541\` FOREIGN KEY (\`customerId\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`sale\` DROP FOREIGN KEY \`FK_a742b91c1b99a4269c102d47541\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`inventory\` DROP FOREIGN KEY \`FK_798ab782f9f63e985026be4e408\``,
    );
    await queryRunner.query(`ALTER TABLE \`inventory\` DROP COLUMN \`saleId\``);
    await queryRunner.query(`DROP TABLE \`sale\``);
  }
}
