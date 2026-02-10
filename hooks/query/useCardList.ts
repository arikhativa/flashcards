import { db } from '@/lib/db';
import { useQuery } from '@tanstack/react-query';

export default function useCardList() {
  return useQuery({
    queryKey: ['cards'],
    queryFn: async () => {
      const result = await db.query.cardTable.findMany({
        with: {
          tagList: {
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
