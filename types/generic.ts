import {ObjectLiteral} from 'typeorm';

export const NEW_ID = 'new';

export type BaseCrud = ObjectLiteral & {
  id: number;
};

export type ComponentProps = {
  mode: CRUDMode;
  id: string;
};

export enum CRUDMode {
  Read = 'read',
  Create = 'create',
  Update = 'update',
}

export enum ObjType {
  Tag = 'tag',
  Card = 'card',
}

export interface TimeRange {
  startDate?: Date;
  endDate?: Date;
}

export enum FilterNames {
  TimeRange = 'Time Range',
  KL = 'Knowledge Level',
}

export interface FilterChip {
  name: FilterNames;
  onClose: () => void;
}
