import { CardFilters } from '@/hooks/query/useCardListFilters';
import { TagFilters } from '@/hooks/query/useTagListFilters';
import { createQueryKeyStore } from '@lukemorales/query-key-factory';

export const queryKeyStore = createQueryKeyStore({
  cards: {
    all: null,
    detail: (id: string) => ({
      queryKey: [id],
    }),
    list: (filters?: CardFilters) => ({
      queryKey: [filters],
    }),
  },
  tag: {
    all: null,
    detail: (id: string) => ({
      queryKey: [id],
    }),
    list: (filters?: TagFilters) => ({
      queryKey: [filters],
    }),
  },
  config: {
    one: null,
  },
});
