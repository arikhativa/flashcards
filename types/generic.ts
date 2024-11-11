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

export interface TimeRange {
  startDate?: Date;
  endDate?: Date;
}

export enum FilterNames {
  TimeRange = "Time Range",
  KL = "Knowledge Level",
  ARCHIVE = "Showing Archive",
}

export interface FilterChip {
  name: FilterNames;
  onClose: () => void;
}

export enum SortNames {
  SIDE_A_ABC = "Side A",
  SIDE_B_ABC = "Side B",
  TIME = "TIME",
  KL = "KL",
}

export enum SortDir {
  ASC = "asc",
  DESC = "desc",
}

export interface Sort {
  field: SortNames;
  direction: SortDir;
}
