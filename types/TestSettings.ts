import { TimeRange } from "./generic";
import { FULL_SELECTED_KL, SelectedKL } from "./KnowledgeLevel";
import { Tag } from "./Tag";

export type TestSide = "A" | "B" | "Both";
export const TEST_SIDES: readonly TestSide[] = ["A", "B", "Both"];

export interface TestSettings {
  numberOfCards: number;
  timeRange: TimeRange;
  selectedTags: Tag[];
  knowledgeLevels: SelectedKL;
  testSide: TestSide;
}

export const EMPTY_TEST_SETTING: TestSettings = {
  numberOfCards: 0,
  timeRange: {},
  knowledgeLevels: FULL_SELECTED_KL,
  testSide: "A",
  selectedTags: [],
};

export interface CardMeta {
  hideSideA?: boolean;
  hideSideB?: boolean;
  success?: boolean;
  answer: string;
}
