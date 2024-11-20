import { CardSchema, ConfSchema, TagSchema } from "../schemas/schemas";
import { DataSource } from "typeorm";
import * as SQLite from "expo-sqlite/legacy";

import "reflect-metadata";

export const FakeDB = new DataSource({
  type: "expo",
  driver: SQLite,
  database: "dev.sqlite",
  entities: [CardSchema, TagSchema, ConfSchema],
  synchronize: false,
  logging: true,
  migrations: ["*.ts"],
});
