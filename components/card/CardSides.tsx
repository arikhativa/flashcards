import { CardRoot, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Typography } from '@/components/ui/text';
import { Card } from '@/db/schema';
import { useSuspenseConfig } from '@/hooks/query/useConfig';
import { knowledgeLevelColorEnum, KnowledgeLevelEnum } from '@/lib/enums';
import { cn } from '@/lib/utils';
import { View } from 'react-native';

interface CardSidesProps {
  sideA?: string;
  sideB?: string;
  hideSideA?: boolean;
  hideSideB?: boolean;
  customSideA?: React.ReactNode;
  customSideB?: React.ReactNode;
  knowledgeLevel?: KnowledgeLevelEnum;
}

function getSide({
  sideValue,
  customSide,
  hideSide,
}: {
  sideValue?: string;
  hideSide?: boolean;
  customSide?: React.ReactNode;
}) {
  if (hideSide) return <Typography>Hidden</Typography>;
  if (customSide) return customSide;
  return <Typography>{sideValue}</Typography>;
}

export default function CardSides({
  sideA,
  sideB,
  knowledgeLevel = 'Learning',
  hideSideA,
  hideSideB,
  customSideA,
  customSideB,
}: CardSidesProps) {
  const { data: conf } = useSuspenseConfig();

  return (
    <CardRoot className={cn('border-b-[20px]', knowledgeLevelColorEnum[knowledgeLevel].borderB)}>
      <CardContent className="flex flex-col gap-6">
        <View className="flex flex-col gap-6">
          <Typography>{conf.sideA}</Typography>
          {getSide({ sideValue: sideA, customSide: customSideA, hideSide: hideSideA })}
        </View>
        <Separator className="" />
        <View className="flex flex-col gap-6">
          <Typography>{conf.sideB}</Typography>
          {getSide({ sideValue: sideB, customSide: customSideB, hideSide: hideSideB })}
        </View>
      </CardContent>
    </CardRoot>
  );
}
