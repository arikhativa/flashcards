export enum SortNames {
  TIME = "TIME",
  SIDE_A_ABC = "Side A",
  SIDE_B_ABC = "Side B",
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
