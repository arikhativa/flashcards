import { Keyboard } from 'react-native';
import CarouselWrapper, { CarouselWrapperRef } from '@/components/CarouselWrapper';
import { useTest } from '@/components/provider/TestProvider';
import CardTest, { CardTestRef } from '@/components/test/CardTest';
import TestFinishScreen from '@/components/test/TestFinishScreen';
import { Typography } from '@/components/ui/text';
import useCreateTestMetadata from '@/hooks/useCreateTestMetadata';
import { AUTO_SCROLL_DELAY } from '@/lib/constants';
import { useEffect, useRef } from 'react';
import { View } from 'react-native';

export default function TestManager() {
  const carouselWrapperRef = useRef<CarouselWrapperRef>(null);
  const { testSettings } = useTest();

  const { cardsToTest, metadataList, setMetadataList } = useCreateTestMetadata(testSettings!);

  const cardTestRef = useRef<CardTestRef[]>([]);

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
    setMetadataList((prev) =>
      prev.map((card, i) => (i === index ? { ...card, answer: newAnswer } : card))
    );
  };

  const updateSuccess = (index: number, newSuccess: boolean) => {
    if (metadataList[index].success === undefined) {
      setTimeout(() => {
        const cur = carouselWrapperRef.current?.currentIndex();
        if (cur === index) {
          if (cur === cardsToTest.length - 1) {
            Keyboard.dismiss();
          }
          scrollToNextPage();
        }
      }, AUTO_SCROLL_DELAY);
    }
    setMetadataList((prev) =>
      prev.map((card, i) => (i === index ? { ...card, success: newSuccess } : card))
    );
  };

  const renderItem = ({ index }: { index: number }): React.JSX.Element => {
    if (!cardsToTest.length || !metadataList.length) {
      return <Typography>No Cards</Typography>; // TODO make this better
    }

    if (index < cardsToTest.length) {
      return (
        <CardTest
          ref={(ref: any) => (cardTestRef.current[index] = ref)}
          index={index}
          length={cardsToTest.length}
          card={cardsToTest[index]}
          cardMeta={metadataList[index]}
          onChangeAnswer={updateAnswer}
          onChangeSuccess={updateSuccess}
          hideSideA={metadataList.length ? metadataList[index].hideSideA : undefined}
        />
      );
    }
    return <TestFinishScreen cardsToTest={cardsToTest} metadataList={metadataList} />;
  };

  return (
    <View className="flex-1">
      <CarouselWrapper
        ref={carouselWrapperRef}
        length={cardsToTest.length ? cardsToTest.length : 0}
        renderItem={renderItem}
      />
    </View>
  );
}
