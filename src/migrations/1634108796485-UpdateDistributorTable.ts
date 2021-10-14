import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateDistributorTable1634108796485 implements MigrationInterface {
  name = 'UpdateDistributorTable1634108796485';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`distributor\` ADD \`code\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`distributor\` DROP COLUMN \`code\``);
  }
}
