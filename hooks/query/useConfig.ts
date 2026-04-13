import { configTable } from '@/db/schema';
import { db } from '@/lib/db';
import { queryKeyStore } from '@/lib/queryKeyStore';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { eq } from 'drizzle-orm';

export function useConfig() {
  return useQuery({
    queryKey: queryKeyStore.config.one.queryKey,
    queryFn: async () => {
      const result = await db.query.configTable.findFirst({ where: eq(configTable.id, 1) });
      if (!result) {
        throw new Error('Not Config found');
      }
      return result;
    },
  });
}

export function useSuspenseConfig() {
  return useSuspenseQuery({
    queryKey: queryKeyStore.config.one.queryKey,
    queryFn: async () => {
      const result = await db.query.configTable.findFirst({ where: eq(configTable.id, 1) });
      if (!result) {
        throw new Error('Not Config found');
      }
      return result;
    },
  });
}
