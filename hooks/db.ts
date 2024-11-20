import { CardSchema, ConfSchema, TagSchema } from "../schemas/schemas";
import { DataSource } from "typeorm";

import * as SQLite from "expo-sqlite/legacy";
import { join } from "path";

import "reflect-metadata";

const DB_NAME = "flashcards11.db";

export const AppDataSource = new DataSource({
  database: DB_NAME,
  type: "expo",
  driver: SQLite,
  entities: [CardSchema, TagSchema, ConfSchema],
  synchronize: false,
  logging: true,
  migrations: [join(__dirname, "../db/migrations/*.ts")],
  subscribers: [],
});
