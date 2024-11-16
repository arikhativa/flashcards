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
