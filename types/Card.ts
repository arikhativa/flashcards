import { CardSchema } from "@/schemas/schemas";
import { KnowledgeLevel } from "./KnowledgeLevel";

export type Card = Omit<CardSchema, "knowledgeLevel"> & {
  knowledgeLevel: KnowledgeLevel;
};

export type CardCreate = Pick<CardSchema, "sideA" | "sideB" | "comment"> & {
  knowledgeLevel: KnowledgeLevel;
};

export type CardUpdate = Omit<Card, "id" | "createdAt" | "updatedAt">;
