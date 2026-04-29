import { BaseTag, Tag } from '@/db/schema';
import { CardFilters } from '@/hooks/query/useCardListFilters';
import { TestSettings } from '@/hooks/query/useTestSettings';
import {
  CardOrderByEnum,
  cardOrderByEnum,
  directionEnum,
  DirectionEnum,
  knowledgeLevelEnum,
} from '@/lib/enums';

export function isTag(tag: BaseTag): tag is Tag {
  return 'cardList' in tag && Array.isArray((tag as Tag).cardList);
}

export function isCardFilters(value: unknown): value is CardFilters {
  if (!value || typeof value !== 'object') return false;

  const obj = value as Record<string, unknown>;

  if (!('orderBy' in obj) || !('kl' in obj) || !('direction' in obj) || !('dateRange' in obj)) {
    return false;
  }

  if (!Object.values(cardOrderByEnum).includes(obj.orderBy as CardOrderByEnum)) {
    return false;
  }

  if (
    !Array.isArray(obj.kl) ||
    !obj.kl.every((item) => Object.values(knowledgeLevelEnum).includes(item))
  ) {
    return false;
  }

  if (!Object.values(directionEnum).includes(obj.direction as DirectionEnum)) {
    return false;
  }

  if (!obj.dateRange) {
    return false;
  }

  if ('search' in obj && typeof obj.search !== 'string' && obj.search !== undefined) {
    return false;
  }

  return true;
}

export function isTestSetting(value: unknown): value is TestSettings {
  if (!value || typeof value !== 'object') return false;

  const obj = value as Record<string, unknown>;

  if (
    !('numberOfCards' in obj) ||
    !('testSide' in obj) ||
    !('range' in obj) ||
    !('knowledgeLevelList' in obj)
  ) {
    return false;
  }

  return true;
}
