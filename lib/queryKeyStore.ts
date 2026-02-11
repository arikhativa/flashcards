import { createQueryKeyStore } from '@lukemorales/query-key-factory';

export const queryKeyStore = createQueryKeyStore({
  cards: {
    all: null,
    detail: (id: string) => ({
      queryKey: [id],
    }),
    list: () => ({
      queryKey: ['list'],
    }),
  },
  tag: {
    all: null,
    detail: (id: string) => ({
      queryKey: [id],
    }),
    list: () => ({
      queryKey: ['list'],
    }),
  },
  config: {
    one: null,
  },
});
