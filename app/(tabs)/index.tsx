import CardTileList from '@/components/card/CardTileList';
import ListFilters from '@/components/ListFilters';
import MainScreen from '@/components/MainScreen';
import useCardList, { CardFilters } from '@/hooks/query/useCardList';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Tab() {
  const [filters, setFilters] = useState<CardFilters>();
  const { data, isError } = useCardList(filters);

  if (isError) {
    console.log('Error with card list');
  }

  return (
    <SafeAreaView className="flex-1">
      <ListFilters
        onSearch={(search) => {
          setFilters((prev) => ({ ...prev, search }));
        }}
      />
      <MainScreen>
        <CardTileList cardList={data || []} />
      </MainScreen>
    </SafeAreaView>
  );
}
