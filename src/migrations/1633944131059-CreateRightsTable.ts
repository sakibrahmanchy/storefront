import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRightsTable1633944131059 implements MigrationInterface {
  name = 'CreateRightsTable1633944131059';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`right\` (\`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user_rights_right\` (\`userId\` int NOT NULL, \`rightId\` int NOT NULL, INDEX \`IDX_008b69b17f2ce4a6125670c353\` (\`userId\`), INDEX \`IDX_484b1dd9a3996eb7cc0001d5bc\` (\`rightId\`), PRIMARY KEY (\`userId\`, \`rightId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_rights_right\` ADD CONSTRAINT \`FK_008b69b17f2ce4a6125670c3538\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_rights_right\` ADD CONSTRAINT \`FK_484b1dd9a3996eb7cc0001d5bc6\` FOREIGN KEY (\`rightId\`) REFERENCES \`right\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user_rights_right\` DROP FOREIGN KEY \`FK_484b1dd9a3996eb7cc0001d5bc6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_rights_right\` DROP FOREIGN KEY \`FK_008b69b17f2ce4a6125670c3538\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_484b1dd9a3996eb7cc0001d5bc\` ON \`user_rights_right\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_008b69b17f2ce4a6125670c353\` ON \`user_rights_right\``,
    );
    await queryRunner.query(`DROP TABLE \`user_rights_right\``);
    await queryRunner.query(`DROP TABLE \`right\``);
  }
}
