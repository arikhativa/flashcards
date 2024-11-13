import { Sort, SortDir, SortNames } from "@/types/generic";
import { TEST_SIDES, TestSide } from "@/types/TestSetting";

export const defaultSort: Sort = {
  field: SortNames.TIME,
  direction: SortDir.DESC,
};

export function isTestSide(value: string): boolean {
  return TEST_SIDES.find((side) => side === (value as TestSide)) !== undefined;
}
