import CardTile from '@/components/card/CardTile';
import { BadgeProps } from '@/components/ui/badge';
import { Typography } from '@/components/ui/text';
import { BaseCard, Card } from '@/db/schema';
import { FlashList } from '@shopify/flash-list';
import { View } from 'react-native';

interface Props {
  list: (BaseCard | Card)[];
  onPress: (t: BaseCard | Card) => void;
}

export default function CardFlashList({ list, onPress }: Props) {
  return (
    <FlashList
      data={list}
      horizontal={false}
      numColumns={3}
      className="px-2 py-0"
      renderItem={({ item }) => {
        return (
          <View className="m-0 flex w-full items-center justify-center p-2">
            <CardTile onPress={() => onPress(item)} className="w-full" card={item} />
          </View>
        );
      }}
      ListEmptyComponent={() => (
        <View className="items-center p-10">
          <Typography className="text-muted-foreground">empty</Typography>
        </View>
      )}
    />
  );
}
