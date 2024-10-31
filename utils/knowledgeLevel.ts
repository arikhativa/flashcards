import { KnowledgeLevel } from "@/types/KnowledgeLevel";

export function isKnowledgeLevel(kl: string): boolean {
  return Object.values(KnowledgeLevel).includes(kl as KnowledgeLevel);
}
