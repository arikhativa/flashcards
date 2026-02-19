import { Card as CardRoot, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Typography } from '@/components/ui/text';
import { useSuspenseConfig } from '@/hooks/query/useConfig';
import { knowledgeLevelColorEnum, KnowledgeLevelEnum } from '@/lib/enums';
import { cn } from '@/lib/utils';
import { View } from 'react-native';

interface CardSidesProps {
  knowledgeLevel: KnowledgeLevelEnum;
  disabled?: boolean;
  sideA: string;
  sideB: string;
  hideSideA?: boolean;
  hideSideB?: boolean;
  onChangeTextA?: (text: string) => void;
  onChangeTextB?: (text: string) => void;
  borderSize?: number;
  cardHeight?: number;
}

export default function CardSides({
  knowledgeLevel,
  disabled,
  sideA,
  sideB,
  hideSideA,
  hideSideB,
  onChangeTextA,
  onChangeTextB,
  borderSize,
  cardHeight,
}: CardSidesProps) {
  const { data: conf } = useSuspenseConfig();

  return (
    <CardRoot className={cn('border-0 border-b-4', knowledgeLevelColorEnum[knowledgeLevel])}>
      <CardContent>
        <View className="">
          <Typography>{conf.sideA}</Typography>
          {!hideSideA ? (
            <Input
              editable={!disabled}
              onChangeText={!disabled ? onChangeTextA : undefined}
              value={sideA}
            />
          ) : (
            <Typography>Hidden</Typography>
          )}
        </View>
        <Separator />
        <View>
          <Typography>{conf.sideB}</Typography>
          {!hideSideB ? (
            <Input
              editable={!disabled}
              onChangeText={!disabled ? onChangeTextB : undefined}
              value={sideB}
            />
          ) : (
            <Typography>Hidden</Typography>
          )}
        </View>
      </CardContent>
    </CardRoot>
  );
}
