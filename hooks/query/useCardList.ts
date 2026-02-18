import { rawCardToCard } from '@/hooks/query/useCard';
import { db } from '@/lib/db';
import { queryKeyStore } from '@/lib/queryKeyStore';
import { useQuery } from '@tanstack/react-query';

export default function useCardList() {
  return useQuery({
    queryKey: queryKeyStore.cards.list().queryKey,
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
      return result.map((e) => rawCardToCard(e));
    },
  });
}
