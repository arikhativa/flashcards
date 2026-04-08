import CardFilterDropdown from '@/components/card/CardFilterDropdown';
import CardSortPopover from '@/components/card/CardSortPopover';
import ListFilters from '@/components/ListFilters';
import useCardListFilters from '@/hooks/query/useCardListFilters';

export function CardListHeader() {
  const { filters, setFilters } = useCardListFilters();

  return (
    <ListFilters
      onSearch={(search) => {
        setFilters({ ...filters, search });
      }}>
      <CardSortPopover
        orderBy={filters.orderBy}
        direction={filters.direction}
        onDirectionChange={(direction) => setFilters({ ...filters, direction })}
        onOrderByChange={(orderBy) => setFilters({ ...filters, orderBy })}
      />
      <CardFilterDropdown />
    </ListFilters>
  );
}
