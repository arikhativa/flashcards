import { ConfSchema } from "@/schemas/schemas";
import { TestSide } from "./TestSettings";

export type Conf = Pick<
  ConfSchema,
  "sideA" | "sideB" | "createdAt" | "updatedAt" | "numberOfCards"
> & {
  testSide: TestSide;
};

export type ConfUpdate = Partial<Omit<Conf, "createdAt" | "updatedAt">>;
