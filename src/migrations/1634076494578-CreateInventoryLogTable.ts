import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInventoryLogTable1634076494578
  implements MigrationInterface
{
  name = 'CreateInventoryLogTable1634076494578';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_da883f8d02581a40e6059bd7b38\``,
    );
    await queryRunner.query(
      `CREATE TABLE \`inventory_log\` (\`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`id\` int NOT NULL AUTO_INCREMENT, \`units_received\` int NOT NULL, \`distributor_price\` double NOT NULL, \`delivered_on\` date NOT NULL, \`logType\` enum ('received', 'bought') NOT NULL DEFAULT 'bought', \`customerId\` int NULL, \`productId\` int NULL, \`distributorId\` int NULL, UNIQUE INDEX \`REL_1da85ca3f15e3323ba52d5b36e\` (\`customerId\`), UNIQUE INDEX \`REL_7878b93342d306307315e2acfd\` (\`productId\`), UNIQUE INDEX \`REL_3674fb6ebddf6bd6b8b7085c27\` (\`distributorId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` DROP COLUMN \`manufacturerId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`manufacturerId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD CONSTRAINT \`FK_da883f8d02581a40e6059bd7b38\` FOREIGN KEY (\`manufacturerId\`) REFERENCES \`manufacturer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`inventory_log\` ADD CONSTRAINT \`FK_1da85ca3f15e3323ba52d5b36ea\` FOREIGN KEY (\`customerId\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`inventory_log\` ADD CONSTRAINT \`FK_7878b93342d306307315e2acfdb\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`inventory_log\` ADD CONSTRAINT \`FK_3674fb6ebddf6bd6b8b7085c27c\` FOREIGN KEY (\`distributorId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`inventory_log\` DROP FOREIGN KEY \`FK_3674fb6ebddf6bd6b8b7085c27c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`inventory_log\` DROP FOREIGN KEY \`FK_7878b93342d306307315e2acfdb\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`inventory_log\` DROP FOREIGN KEY \`FK_1da85ca3f15e3323ba52d5b36ea\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_da883f8d02581a40e6059bd7b38\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` DROP COLUMN \`manufacturer\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` DROP COLUMN \`manufacturerId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`manufacturerId\` int NULL`,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_3674fb6ebddf6bd6b8b7085c27\` ON \`inventory_log\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_7878b93342d306307315e2acfd\` ON \`inventory_log\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_1da85ca3f15e3323ba52d5b36e\` ON \`inventory_log\``,
    );
    await queryRunner.query(`DROP TABLE \`inventory_log\``);
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD CONSTRAINT \`FK_da883f8d02581a40e6059bd7b38\` FOREIGN KEY (\`manufacturerId\`) REFERENCES \`manufacturer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
