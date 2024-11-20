import {
  CardSchema,
  ConfSchema,
  MetaData,
  TagSchema,
} from "../schemas/schemas";
import { DataSource } from "typeorm";
import { migrations } from "./migrations";

import "reflect-metadata";

export const FakeDB = new DataSource({
  type: "sqlite",
  database: "dev.sqlite",
  entities: [CardSchema, TagSchema, ConfSchema, MetaData],
  synchronize: false,
  logging: true,
  migrations: [...migrations],
});
