import CardSides from '@/components/card/CardSides';
import TestStatusButton from '@/components/test/TestStatusButton';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Typography } from '@/components/ui/text';
import { Card } from '@/db/schema';
import { CardMeta } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Eye, EyeClosed } from 'lucide-react-native';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { TextInput, View } from 'react-native';

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
    const inputRef = useRef<TextInput>(null);

    useImperativeHandle(ref, () => ({
      focusOnTextInput: () => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      },
    }));

    return (
      <View className="flex flex-col">
        <Typography variant={'large'} className="m-0 py-2 text-center">
          {index + 1}/{length}
        </Typography>
        <View className="flex flex-col gap-8 px-4">
          <CardSides
            knowledgeLevel={card.knowledgeLevel}
            sideA={card.sideA}
            sideB={card.sideB}
            hideSideA={showAnswer ? false : hideSideA}
            hideSideB={showAnswer ? false : !hideSideA}
          />

          <Input
            autoFocus={index === 0}
            placeholder="Answer"
            className="text-center"
            ref={inputRef}
            value={cardMeta.answer}
            onChangeText={(v: string) => {
              onChangeAnswer(index, v);
            }}
          />

          <View className="flex w-full flex-row gap-8">
            <View className="flex flex-1 flex-col gap-2">
              <Typography className={cn('text-center', !showAnswer && 'text-muted')}>
                Did you get it right?
              </Typography>
              <View className="flex flex-1 flex-row items-end gap-2">
                <TestStatusButton
                  type="x"
                  disabled={!showAnswer}
                  className="flex-1"
                  showBtnColor={cardMeta.success === false && showBtnColor}
                  onPress={() => {
                    onChangeSuccess(index, false);
                    setShowBtnColor(true);
                  }}
                />
                <TestStatusButton
                  type="check"
                  className="flex-1"
                  showBtnColor={cardMeta.success === true && showBtnColor}
                  disabled={!showAnswer}
                  onPress={() => {
                    onChangeSuccess(index, true);
                    setShowBtnColor(true);
                  }}
                />
              </View>
            </View>

            <View>
              {showAnswer ? (
                <Button
                  className="size-20"
                  variant={'outline'}
                  onPress={() => setShowAnswer(false)}>
                  <Icon as={Eye} />
                </Button>
              ) : (
                <Button
                  className="size-20"
                  variant={'outline'}
                  size={'icon'}
                  onPress={() => setShowAnswer(true)}>
                  <Icon as={EyeClosed} />
                </Button>
              )}
            </View>
          </View>
        </View>
      </View>
    );
  }
);

CardTest.displayName = 'CardTest';

export default CardTest;
