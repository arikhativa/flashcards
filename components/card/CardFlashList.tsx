import CardTile, { CardTileProps } from '@/components/card/CardTile';
import { Typography } from '@/components/ui/text';
import { BaseCard, Card } from '@/db/schema';
import { FlashList } from '@shopify/flash-list';
import { useMemo } from 'react';
import { useWindowDimensions, View } from 'react-native';

interface Props {
  list: (BaseCard | Card)[];
  onPress: (obj: BaseCard | Card) => void;
  onLongPress?: (obj: BaseCard | Card) => void;
  getVariant?: (obj: BaseCard | Card) => CardTileProps['variant'];
}

export default function CardFlashList({ list, onPress, onLongPress, getVariant }: Props) {
  const { width } = useWindowDimensions();

  const rows = useMemo(() => calculateRows(list, width), [list, width]);

  return (
    <FlashList
      data={rows}
      horizontal={false}
      numColumns={1}
      className=""
      renderItem={({ item: rowCards }) => (
        <View className="flex flex-row justify-center gap-6 py-3">
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
        </View>
      )}
      ListFooterComponent={() => <View className="h-24" />}
      ListEmptyComponent={() => (
        <View className="items-center p-10">
          <Typography className="text-muted-foreground">empty</Typography>
        </View>
      )}
    />
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
