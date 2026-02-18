import { Tag, tagTable } from '@/db/schema';
import { db } from '@/lib/db';
import { queryKeyStore } from '@/lib/queryKeyStore';
import { RawTag } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
import { eq } from 'drizzle-orm';

export default function useTag(id: string) {
  return useQuery({
    queryKey: queryKeyStore.tag.detail(id).queryKey,
    enabled: id !== null,
    queryFn: async (): Promise<Tag> => {
      const result = await db.query.tagTable.findFirst({
        where: eq(tagTable.id, parseInt(id || '')),
        with: {
          cardList: {
            with: {
              card: true,
            },
          },
        },
      });
      if (!result) {
        throw new Error(`useTag: no tag, id: ${id}`);
      }
      return rawTagToTag(result);
    },
  });
}

export function rawTagToTag(obj: RawTag): Tag {
  const cardList = obj.cardList.map((e) => ({
    ...e.card,
  }));

  return {
    ...obj,
    cardList,
  };
}
