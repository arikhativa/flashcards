import { CardSchema } from "./../schemas/Card";
import { DataSource } from "typeorm";

import "reflect-metadata";

const DB_NAME = "flashcards1.db";

export const source = new DataSource({
  database: DB_NAME,
  type: "expo",
  driver: require("expo-sqlite"),
  entities: [CardSchema],
  synchronize: true,
  logging: true,
  migrations: [],
  subscribers: [],
});
