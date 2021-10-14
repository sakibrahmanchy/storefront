import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateProductTable1634121870111 implements MigrationInterface {
  name = 'UpdateProductTable1634121870111';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`price\` double NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`inventory_log\` ADD CONSTRAINT \`FK_3674fb6ebddf6bd6b8b7085c27c\` FOREIGN KEY (\`distributorId\`) REFERENCES \`distributor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`inventory_log\` DROP FOREIGN KEY \`FK_3674fb6ebddf6bd6b8b7085c27c\``,
    );
    await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`price\``);
  }
}
