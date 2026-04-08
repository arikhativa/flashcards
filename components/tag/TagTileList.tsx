import { Tag } from '@/db/schema';
import { useRouter } from 'expo-router';
import TagFlashList from '@/components/tag/TagFlashList';
import TagListActionBar from '@/components/tag/TagListActionBar';
import { useMultiSelect } from '@/hooks/useMultiSelect';
import { Pressable } from 'react-native';
import FloatBadge from '@/components/FloatBadge';
import ScreenSpinner from '@/components/ScreenSpinner';
import useTagList from '@/hooks/query/useTagList';

interface Props {
  list?: Tag[];
  isPending?: boolean;
}

export default function TagTileList({ list, isPending }: Props) {
  const router = useRouter();
  const allTagListQuery = useTagList();
  const { selectedIds, isIdSelected, isMultiSelectOn, toggleIdSelection, clearSelectedIds } =
    useMultiSelect();

  if (isPending) {
    return <ScreenSpinner />;
  }

  return (
    <Pressable
      className="flex-1"
      onPress={() => {
        if (isMultiSelectOn) clearSelectedIds();
      }}>
      {list?.length ? (
        <FloatBadge
          value={isMultiSelectOn ? `${selectedIds.length}/${list.length}` : list.length}
        />
      ) : null}
      <TagFlashList
        showEmptyState={!allTagListQuery.data?.length}
        tags={list || []}
        getVariant={(obj) => (isIdSelected(obj.id) ? 'outline' : undefined)}
        onLongPress={(item) => {
          toggleIdSelection(item.id);
        }}
        onPress={(item) => {
          if (isMultiSelectOn) {
            toggleIdSelection(item.id);
          } else {
            router.navigate({
              pathname: '/tag/[id]',
              params: { id: item.id },
            });
          }
        }}
      />
      <TagListActionBar
        isMultiSelectOn={isMultiSelectOn}
        selectedIds={selectedIds}
        clearSelectedIds={clearSelectedIds}
      />
    </Pressable>
  );
}
