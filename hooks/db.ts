import { CardSchema } from "./../schemas/Card";
import { DataSource } from "typeorm";

import * as SQLite from "expo-sqlite/legacy";

import "reflect-metadata";

const DB_NAME = "flashcards2.db";

export const source = new DataSource({
  database: DB_NAME,
  type: "expo",
  driver: SQLite,
  entities: [CardSchema],
  synchronize: true,
  logging: false,
  migrations: [],
  subscribers: [],
});
