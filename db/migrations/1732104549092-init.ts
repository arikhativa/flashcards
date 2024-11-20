import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1732104549092 implements MigrationInterface {
    name = 'Init1732104549092'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "card_schema" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "sideA" text NOT NULL, "sideB" text NOT NULL, "comment" text NOT NULL DEFAULT (''), "lastTimeTested" datetime, "knowledgeLevel" text(16) NOT NULL DEFAULT (0), "succuss" integer NOT NULL DEFAULT (0), "failure" integer NOT NULL DEFAULT (0))`);
        await queryRunner.query(`CREATE TABLE "tag_schema" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "name" text NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "conf_schema" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "sideA" text NOT NULL DEFAULT ('A'), "sideB" text NOT NULL DEFAULT ('B'), "testSide" text NOT NULL DEFAULT ('A'), "numberOfCards" integer NOT NULL DEFAULT (10))`);
        await queryRunner.query(`CREATE TABLE "card_schema_tags_tag_schema" ("cardSchemaId" integer NOT NULL, "tagSchemaId" integer NOT NULL, PRIMARY KEY ("cardSchemaId", "tagSchemaId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ce340a944fcb2c3939561e6960" ON "card_schema_tags_tag_schema" ("cardSchemaId") `);
        await queryRunner.query(`CREATE INDEX "IDX_be48ea9c0293b07256a74d96c2" ON "card_schema_tags_tag_schema" ("tagSchemaId") `);
        await queryRunner.query(`DROP INDEX "IDX_ce340a944fcb2c3939561e6960"`);
        await queryRunner.query(`DROP INDEX "IDX_be48ea9c0293b07256a74d96c2"`);
        await queryRunner.query(`CREATE TABLE "temporary_card_schema_tags_tag_schema" ("cardSchemaId" integer NOT NULL, "tagSchemaId" integer NOT NULL, CONSTRAINT "FK_ce340a944fcb2c3939561e6960a" FOREIGN KEY ("cardSchemaId") REFERENCES "card_schema" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_be48ea9c0293b07256a74d96c25" FOREIGN KEY ("tagSchemaId") REFERENCES "tag_schema" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("cardSchemaId", "tagSchemaId"))`);
        await queryRunner.query(`INSERT INTO "temporary_card_schema_tags_tag_schema"("cardSchemaId", "tagSchemaId") SELECT "cardSchemaId", "tagSchemaId" FROM "card_schema_tags_tag_schema"`);
        await queryRunner.query(`DROP TABLE "card_schema_tags_tag_schema"`);
        await queryRunner.query(`ALTER TABLE "temporary_card_schema_tags_tag_schema" RENAME TO "card_schema_tags_tag_schema"`);
        await queryRunner.query(`CREATE INDEX "IDX_ce340a944fcb2c3939561e6960" ON "card_schema_tags_tag_schema" ("cardSchemaId") `);
        await queryRunner.query(`CREATE INDEX "IDX_be48ea9c0293b07256a74d96c2" ON "card_schema_tags_tag_schema" ("tagSchemaId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_be48ea9c0293b07256a74d96c2"`);
        await queryRunner.query(`DROP INDEX "IDX_ce340a944fcb2c3939561e6960"`);
        await queryRunner.query(`ALTER TABLE "card_schema_tags_tag_schema" RENAME TO "temporary_card_schema_tags_tag_schema"`);
        await queryRunner.query(`CREATE TABLE "card_schema_tags_tag_schema" ("cardSchemaId" integer NOT NULL, "tagSchemaId" integer NOT NULL, PRIMARY KEY ("cardSchemaId", "tagSchemaId"))`);
        await queryRunner.query(`INSERT INTO "card_schema_tags_tag_schema"("cardSchemaId", "tagSchemaId") SELECT "cardSchemaId", "tagSchemaId" FROM "temporary_card_schema_tags_tag_schema"`);
        await queryRunner.query(`DROP TABLE "temporary_card_schema_tags_tag_schema"`);
        await queryRunner.query(`CREATE INDEX "IDX_be48ea9c0293b07256a74d96c2" ON "card_schema_tags_tag_schema" ("tagSchemaId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ce340a944fcb2c3939561e6960" ON "card_schema_tags_tag_schema" ("cardSchemaId") `);
        await queryRunner.query(`DROP INDEX "IDX_be48ea9c0293b07256a74d96c2"`);
        await queryRunner.query(`DROP INDEX "IDX_ce340a944fcb2c3939561e6960"`);
        await queryRunner.query(`DROP TABLE "card_schema_tags_tag_schema"`);
        await queryRunner.query(`DROP TABLE "conf_schema"`);
        await queryRunner.query(`DROP TABLE "tag_schema"`);
        await queryRunner.query(`DROP TABLE "card_schema"`);
    }

}
