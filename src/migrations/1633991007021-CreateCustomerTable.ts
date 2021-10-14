import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCustomerTable1633991007021 implements MigrationInterface {
  name = 'CreateCustomerTable1633991007021';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`customer\` (\`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`id\` int NOT NULL AUTO_INCREMENT, \`customer_name\` varchar(255) NOT NULL, \`customer_contact\` varchar(255) NOT NULL, \`customer_email\` varchar(255) NOT NULL, \`last_bill_on\` datetime NULL, \`last_bill_amount\` double NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`customer\``);
  }
}
