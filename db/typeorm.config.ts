import { CardSchema, ConfSchema, TagSchema } from "../schemas/schemas";
import { DataSource } from "typeorm";

import "reflect-metadata";

export const FakeDB = new DataSource({
  type: "sqlite",
  database: "dev.sqlite",
  entities: [CardSchema, TagSchema, ConfSchema],
  synchronize: false,
  logging: true,
  migrations: ["*.ts"],
});
