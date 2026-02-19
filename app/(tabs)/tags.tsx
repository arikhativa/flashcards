import MainScreen from '@/components/MainScreen';
import TagTileList from '@/components/tag/TagTileList';
import { useSuspenseTagList } from '@/hooks/query/useTagList';
import * as React from 'react';

export default function Tab() {
  const { data, isError } = useSuspenseTagList();

  if (isError) {
    console.log('Error with tag list');
  }

  return (
    <MainScreen>
      <TagTileList list={data} />;
    </MainScreen>
  );
}
