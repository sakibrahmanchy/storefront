import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateDistributorTable1634108889200 implements MigrationInterface {
  name = 'UpdateDistributorTable1634108889200';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`distributor\` DROP COLUMN \`name\``);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`distributor\` ADD \`name\` varchar(255) NOT NULL`,
    );
  }
}
