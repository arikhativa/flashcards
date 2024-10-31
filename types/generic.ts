import { ObjectLiteral } from "typeorm";

export type BaseCrud = ObjectLiteral & {
  id: number;
};
