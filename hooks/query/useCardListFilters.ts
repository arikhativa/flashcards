import {
  CardOrderByEnum,
  DirectionEnum,
  knowledgeLevelEnum,
  KnowledgeLevelEnum,
} from '@/lib/enums';
import { DateRange } from '@/lib/types';
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

export interface CardFilters {
  search?: string;
  orderBy: CardOrderByEnum;
  kl: KnowledgeLevelEnum[];
  direction: DirectionEnum;
  dateRange: DateRange;
}

const QUERY_KEY = ['CardListFilters'];

export const DEFAULT_CARD_FILTERS: CardFilters = {
  orderBy: 'CreationTime',
  direction: 'Asc',
  kl: Object.values(knowledgeLevelEnum),
  dateRange: { dateFrom: null, dateTo: null },
} as const;

export default function useCardListFilters() {
  const queryClient = useQueryClient();

  const query = useSuspenseQuery({
    queryKey: QUERY_KEY,
    initialData: DEFAULT_CARD_FILTERS,
    staleTime: Infinity,
    queryFn: async (): Promise<CardFilters> => DEFAULT_CARD_FILTERS,
  });

  const setFilters = (filters: CardFilters) => {
    queryClient.setQueryData<CardFilters>(QUERY_KEY, (prev) => ({
      ...prev,
      ...filters,
    }));
  };
  return { filters: query.data, setFilters };
}
