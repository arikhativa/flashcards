import TagTileList from '@/components/tag/TagTileList';
import { Typography } from '@/components/ui/text';
import useTagList from '@/hooks/query/useTagList';
import * as React from 'react';
import { View } from 'react-native';

export default function Tab() {
  const { data, isError } = useTagList();

  if (isError) {
    console.log('Error with tag list');
  }

  if (data) {
    return <TagTileList list={data} />;
  }

  return (
    <View className="flex-1 items-center justify-center gap-8 p-4">
      <Typography>empty</Typography>
    </View>
  );
}
