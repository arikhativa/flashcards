import { MigrationInterface, QueryRunner } from "typeorm";

export class SortBy1732350406914 implements MigrationInterface {
    name = 'SortBy1732350406914'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_conf_schema" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "sideA" text NOT NULL DEFAULT ('A'), "sideB" text NOT NULL DEFAULT ('B'), "testSide" text NOT NULL DEFAULT ('A'), "numberOfCards" integer NOT NULL DEFAULT (10), "sortBy" text(10) NOT NULL DEFAULT ('TIME'))`);
        await queryRunner.query(`INSERT INTO "temporary_conf_schema"("id", "createdAt", "updatedAt", "sideA", "sideB", "testSide", "numberOfCards") SELECT "id", "createdAt", "updatedAt", "sideA", "sideB", "testSide", "numberOfCards" FROM "conf_schema"`);
        await queryRunner.query(`DROP TABLE "conf_schema"`);
        await queryRunner.query(`ALTER TABLE "temporary_conf_schema" RENAME TO "conf_schema"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "conf_schema" RENAME TO "temporary_conf_schema"`);
        await queryRunner.query(`CREATE TABLE "conf_schema" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "sideA" text NOT NULL DEFAULT ('A'), "sideB" text NOT NULL DEFAULT ('B'), "testSide" text NOT NULL DEFAULT ('A'), "numberOfCards" integer NOT NULL DEFAULT (10))`);
        await queryRunner.query(`INSERT INTO "conf_schema"("id", "createdAt", "updatedAt", "sideA", "sideB", "testSide", "numberOfCards") SELECT "id", "createdAt", "updatedAt", "sideA", "sideB", "testSide", "numberOfCards" FROM "temporary_conf_schema"`);
        await queryRunner.query(`DROP TABLE "temporary_conf_schema"`);
    }

}
