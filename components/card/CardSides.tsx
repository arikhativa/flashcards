import { Card as CardRoot, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Typography } from '@/components/ui/text';
import { useSuspenseConfig } from '@/hooks/query/useConfig';
import { knowledgeLevelColorEnum, knowledgeLevelEnum, KnowledgeLevelEnum } from '@/lib/enums';
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

const HEIGHT = 140;
const BORDER_SIZE = 20;

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
  const border = borderSize || BORDER_SIZE;
  const height = cardHeight || HEIGHT;

  const getKLStyle = () => {
    switch (knowledgeLevel) {
      case knowledgeLevelEnum.Learning:
        return {
          borderBottomColor: knowledgeLevelColorEnum.Learning,
          borderBottomWidth: border,
        };
      case knowledgeLevelEnum.GettingThere:
        return {
          borderBottomColor: knowledgeLevelColorEnum.GettingThere,
          borderBottomWidth: border,
        };
      case knowledgeLevelEnum.Confident:
        return {
          borderBottomColor: knowledgeLevelColorEnum.Confident,
          borderBottomWidth: border,
        };
      default:
        return {};
    }
  };

  return (
    <CardRoot>
      {/* <CardRoot style={[style, getKLStyle()]}> */}
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
