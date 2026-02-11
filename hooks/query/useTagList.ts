import { db } from '@/lib/db';
import { queryKeyStore } from '@/lib/queryKeyStore';
import { useQuery } from '@tanstack/react-query';

export default function useTagList() {
  return useQuery({
    queryKey: queryKeyStore.tag.list().queryKey,
    queryFn: async () => {
      const result = await db.query.tagTable.findMany({
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
