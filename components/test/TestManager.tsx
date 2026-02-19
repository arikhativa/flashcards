import CarouselWrapper, { CarouselWrapperRef } from '@/components/CarouselWrapper';
import { TestSettings, useTest } from '@/components/provider/TestProvider';
import CardTest, { CardTestRef } from '@/components/test/CardTest';
import { Typography } from '@/components/ui/text';
import { Card } from '@/db/schema';
import { AUTO_SCROLL_DELAY } from '@/lib/constants';
import { CardMeta } from '@/lib/types';
import { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';

interface BrowseManagerProps {
  cards: Card[];
}

export default function TestManager({ cards }: BrowseManagerProps) {
  const carouselWrapperRef = useRef<CarouselWrapperRef>(null);
  const { testSettings } = useTest();
  const [randomCards, setRandomCards] = useState<Card[]>(cards);
  const [cardsMeta, setCardsMeta] = useState<CardMeta[]>([]);
  const cardTestRef = useRef<CardTestRef[]>([]);

  useEffect(() => {
    if (!testSettings) {
      console.error('testSettings is null');
      return;
    }
    if (cardsMeta.length === 0) {
      const list: CardMeta[] = [];
      randomCards.forEach((_card) => {
        list.push(getCardMeta(testSettings));
      });
      setCardsMeta(list);
    }
  }, [cardsMeta.length, randomCards, testSettings]);

  const getCardMeta = (ts: TestSettings): CardMeta => {
    if (ts.testSide === 'Both') {
      const randomValue = Math.random() < 0.5 ? 0 : 1;
      return {
        hideSideA: randomValue === 0,
        hideSideB: randomValue === 1,
        answer: '',
      };
    }
    if (ts.testSide === 'A') {
      return {
        answer: '',
        hideSideA: true,
      };
    }
    return {
      answer: '',
      hideSideB: true,
    };
  };

  const scrollToNextPage = () => {
    if (carouselWrapperRef.current) {
      carouselWrapperRef.current.scrollToNextPage();

      if (
        cardTestRef.current &&
        carouselWrapperRef.current.currentIndex() + 1 < cardTestRef.current.length
      ) {
        cardTestRef.current[carouselWrapperRef.current.currentIndex() + 1].focusOnTextInput();
      }
    }
  };

  const updateAnswer = (index: number, newAnswer: string) => {
    setCardsMeta((prev) =>
      prev.map((card, i) => (i === index ? { ...card, answer: newAnswer } : card))
    );
  };

  const updateSuccess = (index: number, newSuccess: boolean) => {
    if (cardsMeta[index].success === undefined) {
      setTimeout(() => {
        const cur = carouselWrapperRef.current?.currentIndex();
        if (cur === index) {
          scrollToNextPage();
        }
      }, AUTO_SCROLL_DELAY);
    }
    setCardsMeta((prev) =>
      prev.map((card, i) => (i === index ? { ...card, success: newSuccess } : card))
    );
  };

  const renderItem = ({ index }: { index: number }): React.JSX.Element => {
    if (!randomCards.length || !cardsMeta.length) {
      return <Typography>No Cards</Typography>; // TODO make this better
    }
    if (index < randomCards.length) {
      return (
        <CardTest
          ref={(ref: any) => (cardTestRef.current[index] = ref)}
          index={index}
          length={randomCards.length}
          card={randomCards[index]}
          cardMeta={cardsMeta[index]}
          onChangeAnswer={updateAnswer}
          onChangeSuccess={updateSuccess}
          hideSideA={cardsMeta.length ? cardsMeta[index].hideSideA : undefined}
        />
      );
    }
    return <Typography>test done</Typography>;
  };

  return (
    <View className="flex-1">
      <CarouselWrapper
        ref={carouselWrapperRef}
        length={cards.length ? cards.length - 1 : 0}
        renderItem={renderItem}
      />
    </View>
  );
}
