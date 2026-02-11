import { tagTable } from '@/db/schema';
import { db } from '@/lib/db';
import { queryKeyStore } from '@/lib/queryKeyStore';
import { useQuery } from '@tanstack/react-query';
import { like } from 'drizzle-orm';

export interface TagFilters {
  search?: string;
}

export default function useTagList(filters?: TagFilters) {
  return useQuery({
    queryKey: queryKeyStore.tag.list(filters).queryKey,
    queryFn: async () => {
      const result = await db.query.tagTable.findMany({
        where: filters?.search ? like(tagTable.name, `%${filters.search}%`) : undefined,
        with: {
          cardList: {
            with: {
              tag: true,
            },
          },
        },
      });
      return result;
    },
  });
}
