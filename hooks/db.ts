import { CardSchema, TagSchema } from "../schemas/schemas";
import { DataSource } from "typeorm";

import * as SQLite from "expo-sqlite/legacy";

import "reflect-metadata";

const DB_NAME = "flashcards3.db";

export const source = new DataSource({
  database: DB_NAME,
  type: "expo",
  driver: SQLite,
  entities: [CardSchema, TagSchema],
  synchronize: true,
  logging: false,
  migrations: [],
  subscribers: [],
});
