import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

export interface TagFilters {
  search?: string;
}

const QUERY_KEY = ['TagListFilters'];

const DEFAULT_FILTERS: TagFilters = {} as const;

export default function useTagListFilters() {
  const queryClient = useQueryClient();

  const query = useSuspenseQuery({
    queryKey: QUERY_KEY,
    initialData: DEFAULT_FILTERS,
    staleTime: Infinity,
    queryFn: async (): Promise<TagFilters> => DEFAULT_FILTERS,
  });

  const setFilters = (filters: TagFilters) => {
    queryClient.setQueryData<TagFilters>(QUERY_KEY, (prev) => ({
      ...prev,
      ...filters,
    }));
  };
  return { filters: query.data, setFilters };
}
