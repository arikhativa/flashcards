import ListFilters from '@/components/ListFilters';
import MainScreen from '@/components/MainScreen';
import { useGlobalHeader } from '@/components/provider/GlobalHeaderProvider';
import TagTileList from '@/components/tag/TagTileList';
import useTagList from '@/hooks/query/useTagList';
import useTagListFilters from '@/hooks/query/useTagListFilters';
import { useFocusEffect } from 'expo-router';
import { useCallback, useMemo } from 'react';
import { View } from 'react-native';

export default function Tab() {
  const { filters, setFilters } = useTagListFilters();
  const { setState } = useGlobalHeader();
  const { data, isError, isPending } = useTagList(filters);

  if (isError) {
    console.error('Error with tag list');
  }

  const headerComp = useMemo(
    () => <ListFilters onSearch={(search) => setFilters({ ...filters, search })} />,
    [filters]
  );

  useFocusEffect(
    useCallback(() => {
      setState({
        title: 'Tags',
        titleType: 'text',
        node: headerComp,
      });
    }, [headerComp])
  );

  return (
    <View className="flex-1">
      <MainScreen className="p-0">
        <TagTileList list={data} isPending={isPending} />
      </MainScreen>
    </View>
  );
}
