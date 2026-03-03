import { Card, cardTable } from '@/db/schema';
import { rawCardToCard } from '@/hooks/query/useCard';
import { CardFilters } from '@/hooks/query/useCardListFilters';
import { db } from '@/lib/db';
import { queryKeyStore } from '@/lib/queryKeyStore';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { asc, desc, like, or, sql } from 'drizzle-orm';

function getOrderBy(filters?: CardFilters) {
  const dir = filters?.direction === 'Asc' ? 'ASC' : 'DESC';

  switch (filters?.orderBy) {
    case 'KnowledgeLevel':
      return sql`${cardTable.knowledgeLevel} ${sql.raw(dir)}`;
    case 'SideA':
      return sql`LOWER(${cardTable.sideA}) ${sql.raw(dir)}`;
    case 'SideB':
      return sql`LOWER(${cardTable.sideB}) ${sql.raw(dir)}`;
    default: // CreationTime
      return sql`${cardTable.createdAt} ${sql.raw(dir)}`;
  }
}
async function queryFn(filters?: CardFilters): Promise<Card[]> {
  const search = filters?.search?.trim();

  const result = await db.query.cardTable.findMany({
    where: search
      ? or(like(cardTable.sideA, `%${search}%`), like(cardTable.sideB, `%${search}%`))
      : undefined,
    orderBy: getOrderBy(filters),
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
