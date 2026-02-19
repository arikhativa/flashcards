import CardSides from '@/components/card/CardSides';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Typography } from '@/components/ui/text';
import { Card } from '@/db/schema';
import { CardMeta } from '@/lib/types';
import { cn } from '@/lib/utils';
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
      <View>
        <Typography>
          {index + 1}/{length}
        </Typography>
        <CardSides
          disabled
          knowledgeLevel={card.knowledgeLevel}
          sideA={card.sideA}
          sideB={card.sideB}
          hideSideA={showAnswer ? false : hideSideA}
          hideSideB={showAnswer ? false : !hideSideA}
        />
        <View>
          <Input
            // ref={inputRef}
            value={cardMeta.answer}
            onChangeText={(v: string) => {
              onChangeAnswer(index, v);
            }}
          />
          <Button onPress={() => setShowAnswer(true)}>
            <Typography>show</Typography>
          </Button>
        </View>
        <View>
          <Typography>Did you get it right?</Typography>
          <View>
            <Button
              disabled={!showAnswer}
              onPress={() => {
                onChangeSuccess(index, false);
                setShowBtnColor(true);
              }}>
              <Typography>close</Typography>
            </Button>
            <Button
              className={cn('')}
              disabled={!showAnswer}
              onPress={() => {
                onChangeSuccess(index, true);
                setShowBtnColor(true);
              }}>
              <Typography>check</Typography>
            </Button>
          </View>
        </View>
      </View>
    );
  }
);

CardTest.displayName = 'CardTest';

export default CardTest;
