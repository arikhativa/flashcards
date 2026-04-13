import CardTile, { CardTileProps } from '@/components/card/CardTile';
import { EmptyItem } from '@/components/EmptyItem';
import { BaseCard, Card } from '@/db/schema';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { Pressable, useWindowDimensions, View } from 'react-native';

interface Props {
  list: (BaseCard | Card)[];
  onPress: (obj: BaseCard | Card) => void;
  onEmptyPress?: () => void;
  showEmptyState?: boolean;
  onLongPress?: (obj: BaseCard | Card) => void;
  getVariant?: (obj: BaseCard | Card) => CardTileProps['variant'];
}

export default function CardFlashList({
  onEmptyPress,
  list,
  onPress,
  onLongPress,
  showEmptyState = false,
  getVariant,
}: Props) {
  const router = useRouter();
  const { width } = useWindowDimensions();

  const rows = useMemo(() => calculateRows(list, width), [list, width]);

  return (
    <View className="flex-1">
      {onEmptyPress && <Pressable className="absolute inset-0" onPress={onEmptyPress} />}
      <FlashList
        data={rows}
        keyboardShouldPersistTaps="always"
        horizontal={false}
        numColumns={1}
        renderItem={({ item: rowCards }) => (
          <Pressable onPress={onEmptyPress} className="flex flex-row justify-center gap-6 py-3">
            {rowCards.map((card) => (
              <View key={card.id} className="">
                <CardTile
                  variant={getVariant?.(card)}
                  onPress={() => onPress(card)}
                  onLongPress={() => onLongPress?.(card)}
                  card={card}
                />
              </View>
            ))}
          </Pressable>
        )}
        ListFooterComponent={() => <View className="h-24" />}
        contentContainerStyle={rows.length === 0 ? { flex: 1 } : {}}
        ListEmptyComponent={
          showEmptyState
            ? () => (
                <EmptyItem
                  title="No Cards"
                  desc="You haven't created any cards yet."
                  onPress={() =>
                    router.navigate({
                      pathname: '/card/new',
                    })
                  }
                  buttonText="Create card"
                />
              )
            : undefined
        }
      />
    </View>
  );
}

const calculateRows = (data: (BaseCard | Card)[], screenWidth: number) => {
  const rows: (BaseCard | Card)[][] = [];
  let currentRow: (BaseCard | Card)[] = [];
  let currentRowWidth = 0;

  const CHAR_WIDTH = 10;
  const PADDING_PER_CARD = 12 * 2;
  const GAP = 24;
  const AVAILABLE_WIDTH = screenWidth;

  data.forEach((card) => {
    const textLen = Math.max(card.sideA.length, card.sideB.length);
    const estimatedWidth = textLen * CHAR_WIDTH + PADDING_PER_CARD;

    if (
      currentRowWidth + estimatedWidth + currentRow.length * GAP > AVAILABLE_WIDTH &&
      currentRow.length > 0
    ) {
      rows.push(currentRow);
      currentRow = [card];
      currentRowWidth = estimatedWidth;
    } else {
      currentRow.push(card);
      currentRowWidth += estimatedWidth;
    }
  });

  if (currentRow.length > 0) rows.push(currentRow);
  return rows;
};
