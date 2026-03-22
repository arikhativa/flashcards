import { BaseCard, Card } from '@/db/schema';
import { View, ViewProps } from 'react-native';
import { Typography } from '@/components/ui/text';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { CardContent, CardRoot } from '@/components/ui/card';
import { knowledgeLevelColorEnum } from '@/lib/enums';
import { cva, type VariantProps } from 'class-variance-authority';
import { TextClassContext } from '@/components/ui/text';
import { GestureWrapper } from '@/components/GestureWrapper';

const cardTileVariants = cva('border border-b-8 bg-background shadow-md shadow-black', {
  variants: {
    variant: {
      default: '',
      muted: 'opacity-60',
      selected: 'border-primary',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const cardTileTextVariants = cva('text-center', {
  variants: {
    variant: {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      selected: 'text-foreground',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export type CardTileProps = ViewProps &
  React.RefAttributes<View> & {
    card: BaseCard | Card;
    onPress?: (c: BaseCard | Card) => void;
    onLongPress?: (c: BaseCard | Card) => void;
    className?: string;
  } & VariantProps<typeof cardTileVariants>;

export default function CardTile({
  card,
  className,
  onPress,
  onLongPress,
  variant,
}: CardTileProps) {
  return (
    <GestureWrapper onPress={() => onPress?.(card)} onLongPress={() => onLongPress?.(card)}>
      <View onStartShouldSetResponder={() => true}>
        <TextClassContext.Provider value={cardTileTextVariants({ variant })}>
          <CardRoot
            className={cn(
              knowledgeLevelColorEnum[card.knowledgeLevel].border,
              cardTileVariants({ variant })
            )}>
            <CardContent className={cn('flex flex-col gap-2', className)}>
              <Typography className="text-center">{card.sideA}</Typography>
              <Separator
                className={cn(variant === 'muted' ? 'bg-gray-300' : 'bg-gray-500')}
                orientation="horizontal"
              />
              <Typography className="text-center">{card.sideB}</Typography>
            </CardContent>
          </CardRoot>
        </TextClassContext.Provider>
      </View>
    </GestureWrapper>
  );
}
