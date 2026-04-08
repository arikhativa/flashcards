import ListFilters from '@/components/ListFilters';
import useTagListFilters from '@/hooks/query/useTagListFilters';

export function TagListHeader() {
  const { filters, setFilters } = useTagListFilters();

  return (
    <ListFilters
      onSearch={(search) => {
        setFilters({ ...filters, search });
      }}></ListFilters>
  );
}
