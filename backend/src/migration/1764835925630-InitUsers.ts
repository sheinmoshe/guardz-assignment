import { MigrationInterface, QueryRunner } from "typeorm";

export class InitUsers1764835925630 implements MigrationInterface {

    name = 'InitUsers1764835925630';

    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.query(`
                CREATE TABLE IF NOT EXISTS user (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username TEXT NOT NULL UNIQUE,
                    age INTEGER NOT NULL,
                    email TEXT NOT NULL UNIQUE,
                    hobbies TEXT NULL
                )
            `);

            await queryRunner.query(`
                INSERT OR IGNORE INTO user (username, age, email, hobbies) VALUES
                       ('moshe', 20, 'moshe@gmail.com', 'sports,music'),
                       ('alex', 21, 'alex@gmail.com', null),
                       ('dana', 22, 'dana@gmail.com', 'swimming,reading')
            `);
        } catch (error) {
            console.error('Migration up error:', error);
            throw error;
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.query(`DROP TABLE IF EXISTS user`);
        } catch (error) {
            console.error('Migration down error:', error);
            throw error;
        }
    }

}
