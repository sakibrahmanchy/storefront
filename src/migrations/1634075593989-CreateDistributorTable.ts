import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDistributorTable1634075593989 implements MigrationInterface {
  name = 'CreateDistributorTable1634075593989';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_da883f8d02581a40e6059bd7b38\``,
    );
    await queryRunner.query(
      `CREATE TABLE \`distributor\` (\`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`distributor_name\` varchar(255) NOT NULL, \`distributor_address\` varchar(255) NOT NULL, \`contact_person\` varchar(255) NOT NULL, \`contact_number\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`distributor_products_product\` (\`distributorId\` int NOT NULL, \`productId\` int NOT NULL, INDEX \`IDX_adb56c083355f8d08ccd18899e\` (\`distributorId\`), INDEX \`IDX_d5bd25df5addd858f3a456fb5c\` (\`productId\`), PRIMARY KEY (\`distributorId\`, \`productId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`product_distributors_distributor\` (\`productId\` int NOT NULL, \`distributorId\` int NOT NULL, INDEX \`IDX_f8777098888ed9c5edac7877bf\` (\`productId\`), INDEX \`IDX_da07c867ad0177634f8fc6ce0f\` (\`distributorId\`), PRIMARY KEY (\`productId\`, \`distributorId\`)) ENGINE=InnoDB`,
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
      `ALTER TABLE \`distributor_products_product\` ADD CONSTRAINT \`FK_adb56c083355f8d08ccd18899e6\` FOREIGN KEY (\`distributorId\`) REFERENCES \`distributor\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`distributor_products_product\` ADD CONSTRAINT \`FK_d5bd25df5addd858f3a456fb5cf\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_distributors_distributor\` ADD CONSTRAINT \`FK_f8777098888ed9c5edac7877bf1\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_distributors_distributor\` ADD CONSTRAINT \`FK_da07c867ad0177634f8fc6ce0f0\` FOREIGN KEY (\`distributorId\`) REFERENCES \`distributor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product_distributors_distributor\` DROP FOREIGN KEY \`FK_da07c867ad0177634f8fc6ce0f0\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_distributors_distributor\` DROP FOREIGN KEY \`FK_f8777098888ed9c5edac7877bf1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`distributor_products_product\` DROP FOREIGN KEY \`FK_d5bd25df5addd858f3a456fb5cf\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`distributor_products_product\` DROP FOREIGN KEY \`FK_adb56c083355f8d08ccd18899e6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_da883f8d02581a40e6059bd7b38\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` DROP COLUMN \`manufacturerId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`manufacturerId\` int NULL`,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_da07c867ad0177634f8fc6ce0f\` ON \`product_distributors_distributor\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_f8777098888ed9c5edac7877bf\` ON \`product_distributors_distributor\``,
    );
    await queryRunner.query(`DROP TABLE \`product_distributors_distributor\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_d5bd25df5addd858f3a456fb5c\` ON \`distributor_products_product\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_adb56c083355f8d08ccd18899e\` ON \`distributor_products_product\``,
    );
    await queryRunner.query(`DROP TABLE \`distributor_products_product\``);
    await queryRunner.query(`DROP TABLE \`distributor\``);
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD CONSTRAINT \`FK_da883f8d02581a40e6059bd7b38\` FOREIGN KEY (\`manufacturerId\`) REFERENCES \`manufacturer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
