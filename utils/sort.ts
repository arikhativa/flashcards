import { SortDir, SortNames } from "@/types/Sort";
import { KnowledgeLevel } from "@/types/KnowledgeLevel";
import { KLToNumber } from "./knowledgeLevel";

export function sorByAlpha<T>(list: T[], field: keyof T, dir: SortDir) {
  return list.sort((a, b) => {
    const aVal = String(a[field]).toLowerCase();
    const bVal = String(b[field]).toLowerCase();

    if (dir === SortDir.DESC) {
      return bVal.localeCompare(aVal);
    }
    return aVal.localeCompare(bVal);
  });
}

type BaseDate = {
  createdAt: Date;
};

export function sortByDate<T extends BaseDate>(list: T[], dir: SortDir) {
  return list.sort((a, b) => {
    const aVal = a.createdAt.getTime();
    const bVal = b.createdAt.getTime();

    if (dir === SortDir.DESC) {
      return bVal - aVal;
    }
    return aVal - bVal;
  });
}

type BaseKL = {
  knowledgeLevel: KnowledgeLevel;
};

export function sortByKL<T extends BaseKL>(list: T[], dir: SortDir) {
  return list.sort((a, b) => {
    const aVal = a.knowledgeLevel;
    const bVal = b.knowledgeLevel;

    if (dir === SortDir.DESC) {
      return KLToNumber(aVal) - KLToNumber(bVal);
    }
    return KLToNumber(bVal) - KLToNumber(aVal);
  });
}

export function isSortName(v: string): boolean {
  return Object.values(SortNames).includes(v as SortNames);
}

export function getSortDirectionByName(name: SortNames) {
  if (name === SortNames.TIME || name === SortNames.KL) {
    return SortDir.DESC;
  }
  return SortDir.ASC;
}
