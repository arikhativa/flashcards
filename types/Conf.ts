import { ConfSchema } from "@/schemas/schemas";

export type Conf = Pick<
  ConfSchema,
  "sideA" | "sideB" | "createdAt" | "updatedAt"
>;

export type ConfUpdate = Partial<Omit<Conf, "createdAt" | "updatedAt">>;
