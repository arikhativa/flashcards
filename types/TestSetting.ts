import { TimeRange } from "./generic";
import { SelectedKL } from "./KnowledgeLevel";
import { Tag } from "./Tag";

export type TestSide = "A" | "B" | "Both";

export interface TestSetting {
  numberOfCards: number;
  timeRange?: TimeRange;
  selectedLists?: Tag[];
  knowledgeLevels?: SelectedKL;
  testSide?: TestSide;
}

export const EMPTY_TEST_SETTING: TestSetting = {
  numberOfCards: 0,
};
