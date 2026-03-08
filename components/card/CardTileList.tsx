import { Card } from '@/db/schema';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '@/components/ui/text';
import { Spinner } from '@/components/external/Spinner';
import CardFlashList from '@/components/card/CardFlashList';
import { useMultiSelect } from '@/hooks/useMultiSelect';
import CardListActionBar from '@/components/card/CardListActionBar';

interface Props {
  cardList?: Card[];
  isPending?: boolean;
}

export default function CardTileList({ cardList, isPending }: Props) {
  const router = useRouter();
  const { selectedIds, isIdSelected, isMultiSelectOn, toggleIdSelection, clearSelectedIds } =
    useMultiSelect();

  const getScreen = () => {
    if (isPending) {
      return (
        <View className="flex flex-1 items-center justify-center">
          <Spinner />
        </View>
      );
    }

    if (!cardList || !cardList.length) {
      return (
        <View className="flex flex-1 items-center justify-center">
          <Typography variant={'muted'}>...</Typography>
        </View>
      );
    }

    return (
      <>
        <CardFlashList
          list={cardList}
          onLongPress={(obj) => {
            toggleIdSelection(obj.id);
          }}
          getVariant={(obj) => (isIdSelected(obj.id) ? 'selected' : undefined)}
          onPress={(obj) => {
            if (isMultiSelectOn) {
              toggleIdSelection(obj.id);
            } else
              router.navigate({
                pathname: '/card/[id]',
                params: { id: obj.id },
              });
          }}
        />

        <CardListActionBar
          clearSelectedIds={clearSelectedIds}
          selectedIds={selectedIds}
          isMultiSelectOn={isMultiSelectOn}
        />
      </>
    );
  };

  return <View className="flex-1">{getScreen()}</View>;
}
