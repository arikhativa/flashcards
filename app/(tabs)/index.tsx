import CardFilterDropdown from '@/components/card/CardFilterDropdown';
import CardSortPopover from '@/components/card/CardSortPopover';
import CardTileList from '@/components/card/CardTileList';
import HexagonBackground from '@/components/HexagonBackground';
import ListFilters from '@/components/ListFilters';
import MainScreen from '@/components/MainScreen';
import useCardList from '@/hooks/query/useCardList';
import useCardListFilters from '@/hooks/query/useCardListFilters';
import { useGlobalHeader } from '@/components/provider/GlobalHeaderProvider';
import { View } from 'react-native';
import { useEffect } from 'react';

export default function Tab() {
  const { setState } = useGlobalHeader();
  const { filters, setFilters } = useCardListFilters();
  const { data, isError, isPending } = useCardList(filters);

  if (isError) {
    console.log('Error with card list');
  }

  const headerComp = (
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

  useEffect(() => {
    setState({
      title: require('assets/images/ffflashcards.png'),
      titleType: 'image',
      node: headerComp,
    });
  }, []);

  return (
    <View className="flex-1">
      <HexagonBackground />
      <MainScreen className="p-0">
        <CardTileList isPending={isPending} cardList={data} />
      </MainScreen>
    </View>
  );
}
