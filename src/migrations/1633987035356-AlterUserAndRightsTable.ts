import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterUserAndRightsTable1633987035356
  implements MigrationInterface
{
  name = 'AlterUserAndRightsTable1633987035356';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`employer_name\` \`employer_name\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`address\` \`address\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`address\` \`address\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`employer_name\` \`employer_name\` varchar(255) NOT NULL`,
    );
  }
}
