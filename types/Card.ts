import { CardSchema, TagSchema } from "@/schemas/schemas";
import { KnowledgeLevel } from "./KnowledgeLevel";

export type Card = Omit<CardSchema, "knowledgeLevel"> & {
  knowledgeLevel: KnowledgeLevel;
};

export type CardCreate = Pick<Card, "sideA" | "sideB" | "comment"> & {
  tags?: number[] | TagSchema[];
  knowledgeLevel: KnowledgeLevel;
};

export type CardUpdate = Partial<Omit<Card, "id" | "createdAt" | "updatedAt">>;
