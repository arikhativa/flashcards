import { ConfSchema } from "@/schemas/schemas";
import { TestSide } from "./TestSettings";
import { SortNames } from "./Sort";

export type Conf = Pick<
  ConfSchema,
  "sideA" | "sideB" | "createdAt" | "updatedAt" | "numberOfCards"
> & {
  testSide: TestSide;
  sortBy: SortNames;
};

export type ConfUpdate = Partial<Omit<Conf, "createdAt" | "updatedAt">>;
