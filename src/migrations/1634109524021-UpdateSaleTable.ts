import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateSaleTable1634109524021 implements MigrationInterface {
  name = 'UpdateSaleTable1634109524021';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_92a87258bc50692ed85360a41af\``,
    );
    await queryRunner.query(
      `CREATE TABLE \`product_sales_sale\` (\`productId\` int NOT NULL, \`saleId\` int NOT NULL, INDEX \`IDX_e9ea80e32da884d6fa0921373f\` (\`productId\`), INDEX \`IDX_85650b1e35f3bfd991a0cbc87a\` (\`saleId\`), PRIMARY KEY (\`productId\`, \`saleId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`sale_products_product\` (\`saleId\` int NOT NULL, \`productId\` int NOT NULL, INDEX \`IDX_d0390564ee502415f34c629ea1\` (\`saleId\`), INDEX \`IDX_4e537a454b2d5fb3df653bbabe\` (\`productId\`), PRIMARY KEY (\`saleId\`, \`productId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`saleId\``);
    await queryRunner.query(
      `ALTER TABLE \`product_sales_sale\` ADD CONSTRAINT \`FK_e9ea80e32da884d6fa0921373f7\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_sales_sale\` ADD CONSTRAINT \`FK_85650b1e35f3bfd991a0cbc87ae\` FOREIGN KEY (\`saleId\`) REFERENCES \`sale\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sale_products_product\` ADD CONSTRAINT \`FK_d0390564ee502415f34c629ea1a\` FOREIGN KEY (\`saleId\`) REFERENCES \`sale\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sale_products_product\` ADD CONSTRAINT \`FK_4e537a454b2d5fb3df653bbabef\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`sale_products_product\` DROP FOREIGN KEY \`FK_4e537a454b2d5fb3df653bbabef\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sale_products_product\` DROP FOREIGN KEY \`FK_d0390564ee502415f34c629ea1a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_sales_sale\` DROP FOREIGN KEY \`FK_85650b1e35f3bfd991a0cbc87ae\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_sales_sale\` DROP FOREIGN KEY \`FK_e9ea80e32da884d6fa0921373f7\``,
    );
    await queryRunner.query(`ALTER TABLE \`product\` ADD \`saleId\` int NULL`);
    await queryRunner.query(
      `DROP INDEX \`IDX_4e537a454b2d5fb3df653bbabe\` ON \`sale_products_product\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_d0390564ee502415f34c629ea1\` ON \`sale_products_product\``,
    );
    await queryRunner.query(`DROP TABLE \`sale_products_product\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_85650b1e35f3bfd991a0cbc87a\` ON \`product_sales_sale\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_e9ea80e32da884d6fa0921373f\` ON \`product_sales_sale\``,
    );
    await queryRunner.query(`DROP TABLE \`product_sales_sale\``);
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD CONSTRAINT \`FK_92a87258bc50692ed85360a41af\` FOREIGN KEY (\`saleId\`) REFERENCES \`sale\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
