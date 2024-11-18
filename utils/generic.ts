import { Sort, SortDir, SortNames } from "@/types/generic";
import { TEST_SIDES, TestSide } from "@/types/TestSettings";
import { Option } from "react-native-paper-dropdown";
export const defaultSort: Sort = {
  field: SortNames.TIME,
  direction: SortDir.DESC,
};

export function isTestSide(value: string): boolean {
  return TEST_SIDES.find((side) => side === (value as TestSide)) !== undefined;
}

// TODO use or remove this
export function enumToSelectArray<T extends Record<string, string>>(
  e: T
): Option[] {
  return Object.entries(e).map(([_, value]) => ({ label: value, value }));
}

export function toRawStringList(ids: number[]): string[] {
  if (ids && ids.length) {
    return ids.map((id) => id.toString());
  }
  console.error("toStringIds", ids);
  return [];
}

export function toStringIds(ids: number[]): string[] {
  if (ids && ids.length) {
    return ids.map((id) => id.toString());
  }
  console.error("toStringIds", ids);
  return [];
}

export function rawStringArrayToIntArray(raw: string): number[] {
  if (!raw) {
    console.error("rawStringArrayToIntArray: empty array", raw);
  }
  const stringArray = raw ? raw.split(",") : [];

  return toIntIds(stringArray);
}

export function toIntIds(ids: string[]): number[] {
  return ids.map((id) => parseInt(id));
}

export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}
