import { Card, cardTable } from '@/db/schema';
import { rawCardToCard } from '@/hooks/query/useCard';
import { CardFilters } from '@/hooks/query/useCardListFilters';
import { db } from '@/lib/db';
import { queryKeyStore } from '@/lib/queryKeyStore';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { and, inArray, like, or, sql } from 'drizzle-orm';

function getOrderBy(filters?: CardFilters) {
  const dir = filters?.direction === 'Asc' ? 'ASC' : 'DESC';

  switch (filters?.orderBy) {
    case 'KnowledgeLevel':
      return sql`${cardTable.knowledgeLevel} ${sql.raw(dir)}`;
    case 'SideA':
      return sql`LOWER(${cardTable.sideA}) ${sql.raw(dir)}`;
    case 'SideB':
      return sql`LOWER(${cardTable.sideB}) ${sql.raw(dir)}`;
    case 'TestedTime':
      return sql`${cardTable.testedAt} ${sql.raw(dir)}`;
    // if (dir === 'DESC') {
    //   return sql`${cardTable.testedAt} ASC NULLS FIRST`;
    // } else {
    //   return sql`${cardTable.testedAt} DESC NULLS LAST`;
    // }
    default: // CreationTime
      return sql`${cardTable.createdAt} ${sql.raw(dir)}`;
  }
}

function getWhere(filters?: CardFilters) {
  if (!filters) return undefined;

  const conditions = [];

  const search = filters.search?.trim();
  if (search) {
    conditions.push(or(like(cardTable.sideA, `%${search}%`), like(cardTable.sideB, `%${search}%`)));
  }

  conditions.push(inArray(cardTable.knowledgeLevel, [...filters.kl]));

  const dateFrom = filters.dateRange.dateFrom;
  const dateTo = filters.dateRange.dateTo;

  if (dateFrom) {
    conditions.push(
      sql`${cardTable.createdAt} >= ${Math.floor(new Date(dateFrom).getTime() / 1000)}`
    );
  }
  if (dateTo) {
    conditions.push(
      sql`${cardTable.createdAt} <= ${Math.floor(new Date(dateTo).getTime() / 1000)}`
    );
  }

  if (conditions.length === 0) return undefined;
  if (conditions.length === 1) return conditions[0];
  return and(...conditions);
}
async function queryFn(filters?: CardFilters): Promise<Card[]> {
  const result = await db.query.cardTable.findMany({
    where: getWhere(filters),
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
