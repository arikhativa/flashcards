import CardSides from '@/components/card/CardSides';
import TestStatusButton from '@/components/test/TestStatusButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Typography } from '@/components/ui/text';
import { Card } from '@/db/schema';
import { CardMeta } from '@/lib/types';
import { Check, Eye, EyeClosed, X } from 'lucide-react-native';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { View } from 'react-native';

export interface CardTestRef {
  focusOnTextInput: () => void;
}

interface CardTestProps {
  hideSideA?: boolean;
  card: Card;
  cardMeta: CardMeta;
  onChangeAnswer: (index: number, text: string) => void;
  onChangeSuccess: (index: number, success: boolean) => void;
  index: number;
  length: number;
}

const CardTest = forwardRef<CardTestRef, CardTestProps>(
  ({ card, hideSideA, index, length, cardMeta, onChangeAnswer, onChangeSuccess }, ref) => {
    const [showAnswer, setShowAnswer] = useState(false);
    const [showBtnColor, setShowBtnColor] = useState<boolean | undefined>(undefined);
    const inputRef = useRef(null);

    useImperativeHandle(ref, () => ({
      focusOnTextInput: () => {
        if (inputRef.current) {
          (inputRef.current as any).focus();
        }
      },
    }));

    return (
      <View className="flex flex-col">
        <Typography variant={'large'} className="m-0 py-2 text-center">
          {index + 1}/{length}
        </Typography>
        <View className="flex flex-col gap-6 px-4">
          <CardSides
            knowledgeLevel={card.knowledgeLevel}
            sideA={card.sideA}
            sideB={card.sideB}
            hideSideA={showAnswer ? false : hideSideA}
            hideSideB={showAnswer ? false : !hideSideA}
          />
          <View className="flex flex-row gap-4">
            <Input
              placeholder="Answer"
              className="flex-1"
              // ref={inputRef}
              value={cardMeta.answer}
              onChangeText={(v: string) => {
                onChangeAnswer(index, v);
              }}
            />
            {showAnswer ? (
              <Button variant={'outline'} size={'icon'} onPress={() => setShowAnswer(false)}>
                <Eye />
              </Button>
            ) : (
              <Button variant={'outline'} size={'icon'} onPress={() => setShowAnswer(true)}>
                <EyeClosed />
              </Button>
            )}
          </View>
          <View className="flex flex-row items-center">
            <Typography className="flex-1">Did you get it right?</Typography>
            <View className="flex flex-row gap-2">
              <TestStatusButton
                type="x"
                disabled={!showAnswer}
                showBtnColor={cardMeta.success === false && showBtnColor}
                onPress={() => {
                  onChangeSuccess(index, false);
                  setShowBtnColor(true);
                }}
              />
              <TestStatusButton
                type="check"
                showBtnColor={cardMeta.success === true && showBtnColor}
                disabled={!showAnswer}
                onPress={() => {
                  onChangeSuccess(index, true);
                  setShowBtnColor(true);
                }}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
);

CardTest.displayName = 'CardTest';

export default CardTest;
