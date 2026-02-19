import { Card } from '@/db/schema';
import { rawCardToCard } from '@/hooks/query/useCard';
import { db } from '@/lib/db';
import { queryKeyStore } from '@/lib/queryKeyStore';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

async function queryFn(): Promise<Card[]> {
  const result = await db.query.cardTable.findMany({
    with: {
      tagList: {
        with: {
          tag: true,
        },
      },
    },
  });
  return result.map((e) => rawCardToCard(e));
}

export default function useCardList() {
  return useQuery({
    queryKey: queryKeyStore.cards.list().queryKey,
    queryFn,
  });
}

export function useSuspenseCardList() {
  return useSuspenseQuery({
    queryKey: queryKeyStore.cards.list().queryKey,
    queryFn,
  });
}
