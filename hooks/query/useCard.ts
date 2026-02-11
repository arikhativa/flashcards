import { cardTable } from '@/db/schema';
import { db } from '@/lib/db';
import { useQuery } from '@tanstack/react-query';
import { eq } from 'drizzle-orm';

export default function useCard(id: string | null) {
  return useQuery({
    queryKey: ['card', id],
    enabled: id !== null,
    queryFn: async () => {
      const result = await db.query.cardTable.findFirst({
        where: eq(cardTable.id, parseInt(id || '')),
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
