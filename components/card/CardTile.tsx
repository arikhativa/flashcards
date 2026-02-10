import { Card } from '@/db/schema';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface Props {
  card: Card;
  className?: string;
}
export default function CardTile({ card, className }: Props) {
  return (
    <View className={cn('gap-2 rounded-md bg-card px-4 py-2', className)}>
      <Text className="text-center">{card.sideA}</Text>
      <Separator orientation="horizontal" />
      <Text className="text-center">{card.sideB}</Text>
    </View>
  );
}
