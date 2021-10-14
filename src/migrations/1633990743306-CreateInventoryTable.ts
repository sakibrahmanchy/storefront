import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInventoryTable1633990743306 implements MigrationInterface {
  name = 'CreateInventoryTable1633990743306';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user_rights_right\` DROP FOREIGN KEY \`FK_484b1dd9a3996eb7cc0001d5bc6\``,
    );
    await queryRunner.query(
      `CREATE TABLE \`inventory\` (\`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`id\` int NOT NULL AUTO_INCREMENT, \`product_name\` varchar(255) NOT NULL, \`manufacturer\` varchar(255) NOT NULL, \`stock\` int NOT NULL, \`last_purchased_on\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_rights_right\` ADD CONSTRAINT \`FK_484b1dd9a3996eb7cc0001d5bc6\` FOREIGN KEY (\`rightId\`) REFERENCES \`right\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user_rights_right\` DROP FOREIGN KEY \`FK_484b1dd9a3996eb7cc0001d5bc6\``,
    );
    await queryRunner.query(`DROP TABLE \`inventory\``);
    await queryRunner.query(
      `ALTER TABLE \`user_rights_right\` ADD CONSTRAINT \`FK_484b1dd9a3996eb7cc0001d5bc6\` FOREIGN KEY (\`rightId\`) REFERENCES \`right\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}
