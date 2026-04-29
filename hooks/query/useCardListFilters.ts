import { Config } from '@/db/schema';
import useConfigEdit from '@/hooks/mutation/useConfigEdit';
import { useSuspenseConfig } from '@/hooks/query/useConfig';
import {
  CardOrderByEnum,
  DirectionEnum,
  knowledgeLevelEnum,
  KnowledgeLevelEnum,
} from '@/lib/enums';
import { queryKeyStore } from '@/lib/queryKeyStore';
import { isCardFilters } from '@/lib/typeGuards';
import { DateRange } from '@/lib/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export interface CardFilters {
  search?: string;
  orderBy: CardOrderByEnum;
  kl: KnowledgeLevelEnum[];
  direction: DirectionEnum;
  dateRange: DateRange;
}

export const DEFAULT_CARD_FILTERS: CardFilters = {
  orderBy: 'CreationTime',
  direction: 'Asc',
  kl: Object.values(knowledgeLevelEnum),
  dateRange: { dateFrom: null, dateTo: null },
} as const;

export default function useCardListFilters() {
  const queryClient = useQueryClient();
  const { data: config } = useSuspenseConfig();
  const { update } = useConfigEdit();

  const filters: CardFilters = isCardFilters(config.cardListFilter)
    ? config.cardListFilter
    : DEFAULT_CARD_FILTERS;

  const { mutate } = useMutation({
    mutationFn: async (variables: CardFilters) => {
      return update({ cardListFilter: variables });
    },
    onSuccess: (_data, variables) => {
      queryClient.setQueryData<Config>(queryKeyStore.config.one.queryKey, () => ({
        ...config,
        cardListFilter: variables,
      }));
    },
  });

  return { filters: filters, setFilters: mutate };
}
