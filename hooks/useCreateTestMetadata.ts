import { TestSettings } from '@/components/provider/TestProvider';
import { Card } from '@/db/schema';
import useCardList from '@/hooks/query/useCardList';
import { CardMeta } from '@/lib/types';
import { useEffect, useState } from 'react';

export default function useCreateTestMetadata(ts: TestSettings) {
  const [cardsToTest, setCardsToTest] = useState<Card[]>([]);
  const [metadataList, setMetadataList] = useState<CardMeta[]>([]);

  const { data: cards, isSuccess } = useCardList();

  useEffect(() => {
    if (cards && isSuccess) {
      setCardsToTest(pickCardsToTest({ list: cards, ts }));
    }
  }, [isSuccess, cards, ts]);

  useEffect(() => {
    if (cardsToTest && cardsToTest.length) {
      const list: CardMeta[] = [];

      cardsToTest.forEach(() => {
        list.push(getCardMeta(ts));
      });

      setMetadataList(list);
    }
  }, [cardsToTest, ts]);

  return { metadataList, cardsToTest, setMetadataList };
}

function pickCardsToTest({ list, ts }: { list: Card[]; ts: TestSettings }) {
  const maxLimit = ts.numberOfCards;
  const newList = list.slice(0, maxLimit);
  return newList;
}

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
