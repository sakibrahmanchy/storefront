import { MigrationInterface, QueryRunner } from 'typeorm';

export class ModifyInventoryEntitityToProduct1633991604662
  implements MigrationInterface
{
  name = 'ModifyInventoryEntitityToProduct1633991604662';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`product\` (\`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`id\` int NOT NULL AUTO_INCREMENT, \`product_name\` varchar(255) NOT NULL, \`manufacturer\` varchar(255) NOT NULL, \`stock\` int NOT NULL, \`last_purchased_on\` timestamp NULL, \`saleId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD CONSTRAINT \`FK_92a87258bc50692ed85360a41af\` FOREIGN KEY (\`saleId\`) REFERENCES \`sale\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_92a87258bc50692ed85360a41af\``,
    );
    await queryRunner.query(`DROP TABLE \`product\``);
  }
}
