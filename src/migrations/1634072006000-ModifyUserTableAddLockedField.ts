import { MigrationInterface, QueryRunner } from 'typeorm';

export class ModifyUserTableAddLockedField1634072006000
  implements MigrationInterface
{
  name = 'ModifyUserTableAddLockedField1634072006000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`locked\` tinyint NOT NULL DEFAULT 0`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`locked\``);
  }
}
