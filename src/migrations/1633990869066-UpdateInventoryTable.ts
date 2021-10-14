import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateInventoryTable1633990869066 implements MigrationInterface {
  name = 'UpdateInventoryTable1633990869066';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`inventory\` CHANGE \`last_purchased_on\` \`last_purchased_on\` timestamp NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`inventory\` CHANGE \`last_purchased_on\` \`last_purchased_on\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
  }
}
