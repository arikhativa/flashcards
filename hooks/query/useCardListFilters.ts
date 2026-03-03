import { CardOrderByEnum, DirectionEnum } from '@/lib/enums';
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

export interface CardFilters {
  search?: string;
  orderBy: CardOrderByEnum;
  direction: DirectionEnum;
}

const QUERY_KEY = ['CardListFilters'];

const DEFAULT_FILTERS: CardFilters = {
  orderBy: 'CreationTime',
  direction: 'Asc',
} as const;

export default function useCardListFilters() {
  const queryClient = useQueryClient();

  const query = useSuspenseQuery({
    queryKey: QUERY_KEY,
    initialData: DEFAULT_FILTERS,
    staleTime: Infinity,
    queryFn: async (): Promise<CardFilters> => DEFAULT_FILTERS,
  });

  const setFilters = (filters: CardFilters) => {
    queryClient.setQueryData<CardFilters>(QUERY_KEY, (prev) => ({
      ...prev,
      ...filters,
    }));
  };
  return { filters: query.data, setFilters };
}
