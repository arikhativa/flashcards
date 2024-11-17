import { KnowledgeLevel, KnowledgeLevelName } from "@/types/KnowledgeLevel";
import { TestSide } from "@/types/TestSettings";

export enum OPTIONS_VALUES {
  Day = "Last Day",
  Week = "Last Week",
  Month = "Last Month",
  Anytime = "Anytime",
}

export const TIME_OPTIONS = [
  { label: OPTIONS_VALUES.Day, value: OPTIONS_VALUES.Day },
  { label: OPTIONS_VALUES.Week, value: OPTIONS_VALUES.Week },
  { label: OPTIONS_VALUES.Month, value: OPTIONS_VALUES.Month },
  { label: OPTIONS_VALUES.Anytime, value: OPTIONS_VALUES.Anytime },
];

export const KL_OPTIONS = [
  { label: KnowledgeLevelName.Learning, value: KnowledgeLevel.Learning },
  {
    label: KnowledgeLevelName.GettingThere,
    value: KnowledgeLevel.GettingThere,
  },
  { label: KnowledgeLevelName.Confident, value: KnowledgeLevel.Confident },
];

export interface CardsSideOptions {
  label: string;
  value: TestSide;
}
