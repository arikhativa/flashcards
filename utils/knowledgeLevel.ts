import { KnowledgeLevel, KnowledgeLevelColor } from "@/types/KnowledgeLevel";

export function isKnowledgeLevel(kl: string): boolean {
  return Object.values(KnowledgeLevel).includes(kl as KnowledgeLevel);
}

export function knowledgeLevelToColor(kl: KnowledgeLevel): KnowledgeLevelColor {
  switch (kl) {
    case KnowledgeLevel.Learning:
      return KnowledgeLevelColor.Learning;
    case KnowledgeLevel.GettingThere:
      return KnowledgeLevelColor.GettingThere;
    case KnowledgeLevel.Confident:
      return KnowledgeLevelColor.Confident;
    default:
      return KnowledgeLevelColor.Learning;
  }
}
