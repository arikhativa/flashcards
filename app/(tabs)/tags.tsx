import ListFilters from '@/components/ListFilters';
import MainScreen from '@/components/MainScreen';
import TagTileList from '@/components/tag/TagTileList';
import { useSuspenseTagList } from '@/hooks/query/useTagList';
import useTagListFilters from '@/hooks/query/useTagListFilters';
import * as React from 'react';
import { View } from 'react-native';

export default function Tab() {
  const { filters, setFilters } = useTagListFilters();

  const { data, isError } = useSuspenseTagList(filters);

  if (isError) {
    console.log('Error with tag list');
  }

  return (
    <View className="flex-1">
      <ListFilters
        onSearch={(search) => {
          setFilters({ ...filters, search });
        }}
      />
      <MainScreen>
        <TagTileList list={data} />
      </MainScreen>
    </View>
  );
}
