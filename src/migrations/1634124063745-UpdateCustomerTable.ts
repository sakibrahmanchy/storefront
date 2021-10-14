import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateCustomerTable1634124063745 implements MigrationInterface {
  name = 'UpdateCustomerTable1634124063745';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`customer\` CHANGE \`last_bill_amount\` \`last_bill_amount\` double NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`customer\` CHANGE \`last_bill_amount\` \`last_bill_amount\` double(22) NOT NULL`,
    );
  }
}
