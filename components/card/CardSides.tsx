import { Plasters } from '@/components/test/Plasters';
import { CardRoot, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Typography } from '@/components/ui/text';
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
  className?: string;
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
  if (hideSide) return <Plasters />;
  if (customSide) return customSide;
  return <Typography className="text-center">{sideValue}</Typography>;
}

export default function CardSides({
  sideA,
  sideB,
  className,
  knowledgeLevel = 'Learning',
  hideSideA,
  hideSideB,
  customSideA,
  customSideB,
}: CardSidesProps) {
  const { data: conf } = useSuspenseConfig();

  return (
    <CardRoot
      className={cn(
        'flex flex-col justify-center border-2 border-b-[20px]',
        knowledgeLevelColorEnum[knowledgeLevel].border,
        className
      )}>
      <CardContent className="flex flex-col gap-6">
        <View className="flex flex-col gap-6">
          <Typography variant={'muted'}>{conf.sideA}</Typography>
          {getSide({ sideValue: sideA, customSide: customSideA, hideSide: hideSideA })}
        </View>
        <Separator className="border-black bg-black" />
        <View className="flex flex-col gap-6">
          <Typography variant={'muted'}>{conf.sideB}</Typography>
          {getSide({ sideValue: sideB, customSide: customSideB, hideSide: hideSideB })}
        </View>
      </CardContent>
    </CardRoot>
  );
}
