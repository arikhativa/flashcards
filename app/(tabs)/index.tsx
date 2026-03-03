import CardFilterPopover from '@/components/card/CardFilterPopover';
import CardSortPopover from '@/components/card/CardSortPopover';
import CardTileList from '@/components/card/CardTileList';
import ListFilters from '@/components/ListFilters';
import MainScreen from '@/components/MainScreen';
import useCardList from '@/hooks/query/useCardList';
import useCardListFilters from '@/hooks/query/useCardListFilters';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Tab() {
  const { filters, setFilters } = useCardListFilters();
  const { data, isError, isPending } = useCardList(filters);

  if (isError) {
    console.log('Error with card list');
  }

  return (
    <SafeAreaView className="flex-1">
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
        <CardFilterPopover kl={filters.kl} onKLChange={(kl) => setFilters({ ...filters, kl })} />
      </ListFilters>
      <MainScreen>
        <CardTileList isPending={isPending} cardList={data} />
      </MainScreen>
    </SafeAreaView>
  );
}
