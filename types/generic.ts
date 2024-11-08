import { ObjectLiteral } from "typeorm";

export type BaseCrud = ObjectLiteral & {
  id: number;
};

export type ComponentProps<T> = {
  mode: CRUDMode;
  data?: T;
  id?: string;
};

export enum CRUDMode {
  Read = "read",
  Create = "create",
  Update = "update",
}

export enum ObjType {
  Tag = "tag",
  Card = "card",
}
