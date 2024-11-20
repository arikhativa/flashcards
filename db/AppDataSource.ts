import {
  CardSchema,
  ConfSchema,
  MetaData,
  TagSchema,
} from "../schemas/schemas";
import { DataSource } from "typeorm";

import "reflect-metadata";
import { migrations } from "./migrations";

const DB_NAME = "flashcards.db";

export const AppDataSource = new DataSource({
  database: DB_NAME,
  type: "react-native",
  location: "default",
  entities: [CardSchema, TagSchema, ConfSchema, MetaData],
  synchronize: false,
  logging: false,
  migrations: [...migrations],
});
