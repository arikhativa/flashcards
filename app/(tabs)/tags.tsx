import MainScreen from '@/components/MainScreen';
import TagTileList from '@/components/tag/TagTileList';
import useTagList from '@/hooks/query/useTagList';
import useTagListFilters from '@/hooks/query/useTagListFilters';
import { View } from 'react-native';

export default function Tab() {
  const { filters } = useTagListFilters();
  const { data, isError, isPending } = useTagList(filters);

  if (isError) {
    console.error('Error with tag list');
  }

  return (
    <View className="flex-1">
      <MainScreen className="p-0">
        <TagTileList list={data} isPending={isPending} />
      </MainScreen>
    </View>
  );
}
