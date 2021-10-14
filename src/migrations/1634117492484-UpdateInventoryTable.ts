import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateInventoryTable1634117492484 implements MigrationInterface {
  name = 'UpdateInventoryTable1634117492484';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`inventory_log\` DROP FOREIGN KEY \`FK_3674fb6ebddf6bd6b8b7085c27c\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_3674fb6ebddf6bd6b8b7085c27\` ON \`inventory_log\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`inventory_log\` ADD CONSTRAINT \`FK_7878b93342d306307315e2acfdb\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`inventory_log\` DROP FOREIGN KEY \`FK_7878b93342d306307315e2acfdb\``,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_3674fb6ebddf6bd6b8b7085c27\` ON \`inventory_log\` (\`distributorId\`)`,
    );
  }
}
