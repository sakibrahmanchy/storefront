import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateManufacturerTable1634075205079
  implements MigrationInterface
{
  name = 'CreateManufacturerTable1634075205079';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product\` CHANGE \`manufacturer\` \`manufacturerId\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` CHANGE \`manufacturerId\` \`manufacturer\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `CREATE TABLE \`manufacturer\` (\`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` DROP COLUMN \`manufacturer\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`manufacturerId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD CONSTRAINT \`FK_da883f8d02581a40e6059bd7b38\` FOREIGN KEY (\`manufacturerId\`) REFERENCES \`manufacturer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
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
      `ALTER TABLE \`product\` ADD \`manufacturer\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE \`manufacturer\``);
    await queryRunner.query(
      `ALTER TABLE \`product\` CHANGE \`manufacturer\` \`manufacturerId\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` CHANGE \`manufacturerId\` \`manufacturer\` varchar(255) NOT NULL`,
    );
  }
}
