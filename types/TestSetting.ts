import { TimeRange } from "./generic";
import { FULL_UNSELECTED_KL, SelectedKL } from "./KnowledgeLevel";
import { Tag } from "./Tag";

export type TestSide = "A" | "B" | "Both";
export const TEST_SIDES: readonly TestSide[] = ["A", "B", "Both"];

export interface TestSetting {
  numberOfCards: number;
  timeRange: TimeRange;
  selectedTags: Tag[];
  knowledgeLevels: SelectedKL;
  testSide: TestSide;
}

export const EMPTY_TEST_SETTING: TestSetting = {
  numberOfCards: 0,
  timeRange: {},
  knowledgeLevels: FULL_UNSELECTED_KL,
  testSide: "A",
  selectedTags: [],
};
