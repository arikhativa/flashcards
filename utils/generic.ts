import { Sort, SortDir, SortNames } from "@/types/generic";

export const defaultSort: Sort = {
  field: SortNames.TIME,
  direction: SortDir.DESC,
};
