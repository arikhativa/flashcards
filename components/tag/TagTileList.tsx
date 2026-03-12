import { Tag } from '@/db/schema';
import { useRouter } from 'expo-router';
import TagFlashList from '@/components/tag/TagFlashList';
import TagListActionBar from '@/components/tag/TagListActionBar';
import { useMultiSelect } from '@/hooks/useMultiSelect';
import { Pressable } from 'react-native';

interface Props {
  list: Tag[];
}

export default function TagTileList({ list }: Props) {
  const router = useRouter();
  const { selectedIds, isIdSelected, isMultiSelectOn, toggleIdSelection, clearSelectedIds } =
    useMultiSelect();

  return (
    <Pressable
      className="flex-1"
      onPress={() => {
        if (isMultiSelectOn) clearSelectedIds();
      }}>
      <TagFlashList
        tags={list}
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
