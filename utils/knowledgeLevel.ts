import {
  KnowledgeLevel,
  KnowledgeLevelColor,
  SelectedKL,
} from "@/types/KnowledgeLevel";

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

export function isKnowledgeLevelFullOn(kl: SelectedKL): boolean {
  return Object.values(kl).every((value) => value);
}

export function KLtoNumber(kl: KnowledgeLevel): number {
  switch (kl) {
    case KnowledgeLevel.Learning:
      return 1;
    case KnowledgeLevel.GettingThere:
      return 2;
    case KnowledgeLevel.Confident:
      return 3;
    default:
      return 0;
  }
}
