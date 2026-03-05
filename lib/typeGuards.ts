import { BaseTag, Tag } from '@/db/schema';

export function isTag(tag: BaseTag): tag is Tag {
  return 'cardList' in tag && Array.isArray((tag as Tag).cardList);
}
