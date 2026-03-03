import CardTileList from '@/components/card/CardTileList';
import ListFilters from '@/components/ListFilters';
import MainScreen from '@/components/MainScreen';
import { useSuspenseCardList } from '@/hooks/query/useCardList';
import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Tab() {
  const { data, isError } = useSuspenseCardList();

  if (isError) {
    console.log('Error with card list');
  }

  return (
    <SafeAreaView className="flex-1">
      <ListFilters
        onSearch={(v) => {
          console.log('v', v);
        }}
      />
      <MainScreen>
        <CardTileList cardList={data} />
      </MainScreen>
    </SafeAreaView>
  );
}
