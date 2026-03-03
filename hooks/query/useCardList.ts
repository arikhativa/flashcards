import { Card, cardTable } from '@/db/schema';
import { rawCardToCard } from '@/hooks/query/useCard';
import { db } from '@/lib/db';
import { queryKeyStore } from '@/lib/queryKeyStore';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { like, or } from 'drizzle-orm';

export interface CardFilters {
  search?: string;
}

async function queryFn(filters?: CardFilters): Promise<Card[]> {
  const search = filters?.search?.trim();
  const result = await db.query.cardTable.findMany({
    where: search
      ? or(like(cardTable.sideA, `%${search}%`), like(cardTable.sideB, `%${search}%`))
      : undefined,
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

export default function useCardList(filters?: CardFilters) {
  return useQuery({
    queryKey: queryKeyStore.cards.list(filters).queryKey,
    queryFn: () => queryFn(filters),
  });
}

export function useSuspenseCardList(filters?: CardFilters) {
  return useSuspenseQuery({
    queryKey: queryKeyStore.cards.list(filters).queryKey,
    queryFn: () => queryFn(filters),
  });
}
