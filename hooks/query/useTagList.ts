import { Tag, tagTable } from '@/db/schema';
import { rawTagToTag } from '@/hooks/query/useTag';
import { TagFilters } from '@/hooks/query/useTagListFilters';
import { db } from '@/lib/db';
import { queryKeyStore } from '@/lib/queryKeyStore';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { like } from 'drizzle-orm';

async function queryFn(filters?: TagFilters): Promise<Tag[]> {
  const result = await db.query.tagTable.findMany({
    where: filters?.search ? like(tagTable.name, `%${filters.search}%`) : undefined,
    with: {
      cardList: {
        with: {
          card: true,
        },
      },
    },
  });
  return result.map((e) => rawTagToTag(e));
}

export default function useTagList(filters?: TagFilters) {
  return useQuery({
    queryKey: queryKeyStore.tag.list(filters).queryKey,
    queryFn: () => queryFn(filters),
  });
}

export function useSuspenseTagList(filters?: TagFilters) {
  return useSuspenseQuery({
    queryKey: queryKeyStore.tag.list(filters).queryKey,
    queryFn: () => queryFn(filters),
  });
}
