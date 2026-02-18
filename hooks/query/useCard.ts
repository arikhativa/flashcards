import { Card, cardTable } from '@/db/schema';
import { db } from '@/lib/db';
import { queryKeyStore } from '@/lib/queryKeyStore';
import { RawCard } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
import { eq } from 'drizzle-orm';

export default function useCard(id: string) {
  return useQuery({
    queryKey: queryKeyStore.cards.detail(id).queryKey,
    enabled: id !== null,
    queryFn: async (): Promise<Card> => {
      const result = await db.query.cardTable.findFirst({
        where: eq(cardTable.id, parseInt(id || '')),
        with: {
          tagList: {
            with: {
              tag: true,
            },
          },
        },
      });
      if (!result) {
        throw new Error(`useCard: no card, id: ${id}`);
      }
      return rawCardToCard(result);
    },
  });
}

export function rawCardToCard(obj: RawCard): Card {
  const tagList = obj.tagList.map((e) => ({
    ...e.tag,
  }));

  return {
    ...obj,
    tagList,
  };
}
