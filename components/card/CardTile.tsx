import { BaseCard, Card } from '@/db/schema';
import { Pressable } from 'react-native';
import { Typography } from '@/components/ui/text';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { CardContent, CardRoot } from '@/components/ui/card';
import { knowledgeLevelColorEnum } from '@/lib/enums';

interface Props {
  card: BaseCard | Card;
  onPress?: (c: BaseCard | Card) => void;
  className?: string;
}

export default function CardTile({ card, className, onPress }: Props) {
  return (
    <Pressable onPress={() => onPress?.(card)}>
      <CardRoot
        className={cn(
          'border-b-8 shadow-xl',
          knowledgeLevelColorEnum[card.knowledgeLevel].borderB
        )}>
        <CardContent className={cn('flex flex-col gap-2', className)}>
          <Typography className="text-center">{card.sideA}</Typography>
          <Separator className="bg-gray-500" orientation="horizontal" />
          <Typography className="text-center">{card.sideB}</Typography>
        </CardContent>
      </CardRoot>
    </Pressable>
  );
}
