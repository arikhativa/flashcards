import { Card } from '@/db/schema';
import { Pressable, View } from 'react-native';
import { useRouter } from 'expo-router';
import CardFlashList from '@/components/card/CardFlashList';
import { useMultiSelect } from '@/hooks/useMultiSelect';
import CardListActionBar from '@/components/card/CardListActionBar';
import ScreenSpinner from '@/components/ScreenSpinner';
import FloatBadge from '@/components/FloatBadge';

interface Props {
  cardList?: Card[];
  isPending?: boolean;
}

export default function CardTileList({ cardList, isPending }: Props) {
  const router = useRouter();
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
      {cardList?.length ? <FloatBadge value={cardList.length} /> : null}
      <CardFlashList
        list={cardList || []}
        onLongPress={(obj) => {
          toggleIdSelection(obj.id);
        }}
        getVariant={(obj) => (isIdSelected(obj.id) ? 'selected' : undefined)}
        onPress={(obj) => {
          if (isMultiSelectOn) {
            toggleIdSelection(obj.id);
          } else {
            router.navigate({
              pathname: '/card/[id]',
              params: { id: obj.id },
            });
          }
        }}
      />

      <CardListActionBar
        clearSelectedIds={clearSelectedIds}
        selectedIds={selectedIds}
        isMultiSelectOn={isMultiSelectOn}
      />
    </Pressable>
  );
}
