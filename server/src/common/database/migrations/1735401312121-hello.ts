import { MigrationInterface, QueryRunner } from 'typeorm';

export class Hello1735401312121 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "ALTER TABLE 'Books' ADD COLUMN book_default varchar DEFAULT 'hello'",
        );
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "Books" DROP COLUMN book_default');
    }
}
