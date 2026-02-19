import { Card } from '@/db/schema';
import { Pressable } from 'react-native';
import { Typography } from '@/components/ui/text';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { CardContent, CardRoot } from '@/components/ui/card';

interface Props {
  card: Card;
  onPress?: (c: Card) => void;

  className?: string;
}
export default function CardTile({ card, className, onPress }: Props) {
  return (
    <Pressable onPress={() => onPress?.(card)}>
      <CardRoot className={cn('m-4 gap-2 px-4 py-2', className)}>
        <CardContent>
          <Typography className="text-center">{card.sideA}</Typography>
          <Separator orientation="horizontal" />
          <Typography className="text-center">{card.sideB}</Typography>
        </CardContent>
      </CardRoot>
    </Pressable>
  );
}
