import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateInventoryTable1634116186692 implements MigrationInterface {
  name = 'UpdateInventoryTable1634116186692';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`inventory_log\` DROP FOREIGN KEY \`FK_1da85ca3f15e3323ba52d5b36ea\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`inventory_log\` DROP FOREIGN KEY \`FK_3674fb6ebddf6bd6b8b7085c27c\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_1da85ca3f15e3323ba52d5b36e\` ON \`inventory_log\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`inventory_log\` DROP COLUMN \`customerId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`inventory_log\` ADD CONSTRAINT \`FK_3674fb6ebddf6bd6b8b7085c27c\` FOREIGN KEY (\`distributorId\`) REFERENCES \`distributor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`inventory_log\` DROP FOREIGN KEY \`FK_3674fb6ebddf6bd6b8b7085c27c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`inventory_log\` ADD \`customerId\` int NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_1da85ca3f15e3323ba52d5b36e\` ON \`inventory_log\` (\`customerId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`inventory_log\` ADD CONSTRAINT \`FK_3674fb6ebddf6bd6b8b7085c27c\` FOREIGN KEY (\`distributorId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`inventory_log\` ADD CONSTRAINT \`FK_1da85ca3f15e3323ba52d5b36ea\` FOREIGN KEY (\`customerId\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
