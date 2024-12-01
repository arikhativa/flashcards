import {
  KnowledgeLevel,
  KnowledgeLevelColor,
  KnowledgeLevelLightColor,
  KnowledgeLevelName,
  SelectedKL,
} from '../types/KnowledgeLevel';
import {clamp} from 'react-native-reanimated';

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

export function knowledgeLevelToLightColor(
  kl: KnowledgeLevel,
): KnowledgeLevelLightColor {
  switch (kl) {
    case KnowledgeLevel.Learning:
      return KnowledgeLevelLightColor.Learning;
    case KnowledgeLevel.GettingThere:
      return KnowledgeLevelLightColor.GettingThere;
    case KnowledgeLevel.Confident:
      return KnowledgeLevelLightColor.Confident;
    default:
      return KnowledgeLevelLightColor.Learning;
  }
}

export function knowledgeLevelToName(kl: KnowledgeLevel): KnowledgeLevelName {
  switch (kl) {
    case KnowledgeLevel.Learning:
      return KnowledgeLevelName.Learning;
    case KnowledgeLevel.GettingThere:
      return KnowledgeLevelName.GettingThere;
    case KnowledgeLevel.Confident:
      return KnowledgeLevelName.Confident;
    default:
      return KnowledgeLevelName.Learning;
  }
}

export function isKnowledgeLevelFullOn(kl: SelectedKL): boolean {
  return Object.values(kl).every(value => value);
}

export function KLToNumber(kl: KnowledgeLevel): number {
  switch (kl) {
    case KnowledgeLevel.Learning:
      return 1;
    case KnowledgeLevel.GettingThere:
      return 2;
    case KnowledgeLevel.Confident:
      return 3;
    default:
      return -1;
  }
}

export function NumberToKL(n: number): KnowledgeLevel {
  switch (clamp(n, 1, 3)) {
    case 1:
      return KnowledgeLevel.Learning;
    case 2:
      return KnowledgeLevel.GettingThere;
    case 3:
      return KnowledgeLevel.Confident;
    default:
      return KnowledgeLevel.Confident;
  }
}

export function ListKLToSelectedKL(list: string[]): SelectedKL {
  return {
    [KnowledgeLevel.Learning]: list.includes(KnowledgeLevel.Learning),
    [KnowledgeLevel.GettingThere]: list.includes(KnowledgeLevel.GettingThere),
    [KnowledgeLevel.Confident]: list.includes(KnowledgeLevel.Confident),
  };
}
