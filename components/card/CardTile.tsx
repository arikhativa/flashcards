import { Card } from '@/db/schema';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Separator } from '@/components/ui/separator';

interface Props {
  card: Card;
}
export default function CardTile({ card }: Props) {
  return (
    <View className="flex flex-col">
      <View className="">
        <Text>{card.sideA}</Text>
      </View>
      <Separator orientation="horizontal" />
      <View>
        <Text>{card.sideB}</Text>
      </View>
    </View>
  );
}
