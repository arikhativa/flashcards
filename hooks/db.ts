import { CardSchema, ConfSchema, TagSchema } from "../schemas/schemas";
import { DataSource } from "typeorm";

import * as SQLite from "expo-sqlite/legacy";

import "reflect-metadata";

const DB_NAME = "flashcards2.db";

export const source = new DataSource({
  database: DB_NAME,
  type: "expo",
  driver: SQLite,
  entities: [CardSchema, TagSchema, ConfSchema],
  synchronize: true,
  logging: false,
  migrations: [],
  subscribers: [],
});
