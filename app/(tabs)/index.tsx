import CardTileList from '@/components/card/CardTileList';
import HexagonBackground from '@/components/HexagonBackground';
import MainScreen from '@/components/MainScreen';
import useCardList from '@/hooks/query/useCardList';
import useCardListFilters from '@/hooks/query/useCardListFilters';
import { View } from 'react-native';

export default function Tab() {
  const { filters } = useCardListFilters();
  const { data, isError, isPending } = useCardList(filters);

  if (isError) {
    console.error('Error with card list');
  }

  return (
    <View className="flex-1">
      <HexagonBackground />
      <MainScreen className="p-0">
        <CardTileList isPending={isPending} cardList={data} />
      </MainScreen>
    </View>
  );
}
