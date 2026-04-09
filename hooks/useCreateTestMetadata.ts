import { TestSettings } from '@/components/provider/TestProvider';
import { Card, Tag } from '@/db/schema';
import useCardList from '@/hooks/query/useCardList';
import { CardFilters, DEFAULT_CARD_FILTERS } from '@/hooks/query/useCardListFilters';
import useTagList from '@/hooks/query/useTagList';
import { TagFilters } from '@/hooks/query/useTagListFilters';
import { CardMeta } from '@/lib/types';
import { useEffect, useMemo, useState } from 'react';

export default function useCreateTestMetadata({
  tagIdsToTest,
  numberOfCards,
  range,
  knowledgeLevelList,
  cardIdsToTest,
}: TestSettings) {
  const [cardsToTest, setCardsToTest] = useState<Card[]>([]);

  const filters = useMemo<CardFilters>(
    () => ({
      ...DEFAULT_CARD_FILTERS,
      orderBy: 'TestedTime',
      direction: 'Asc',
      dateRange: range,
      kl: knowledgeLevelList,
    }),
    [range, knowledgeLevelList]
  );

  const tagFilters = useMemo<TagFilters>(() => ({ ids: tagIdsToTest }), [tagIdsToTest]);

  const tagQuery = useTagList(tagFilters, !!tagIdsToTest);

  const { data: cards, isSuccess } = useCardList(filters);

  useEffect(() => {
    let list = undefined;
    if (!!tagIdsToTest && tagQuery.isSuccess && cards && isSuccess) {
      list = pickCardsToTest({
        cardList: cards,
        tagList: tagQuery.data,
        cardIdsToTest,
        numberOfCards,
      });
    } else if (!tagIdsToTest && cards && isSuccess) {
      list = pickCardsToTest({ cardList: cards, numberOfCards, cardIdsToTest });
    }

    if (list) {
      setCardsToTest(shuffleCards(list));
    }
  }, [
    isSuccess,
    cards,
    tagQuery.isSuccess,
    tagQuery.data,
    tagIdsToTest,
    cardIdsToTest,
    numberOfCards,
  ]);

  return { cardsToTest };
}

function pickCardsToTest({
  cardList,
  cardIdsToTest,
  numberOfCards,
  tagList,
}: {
  cardList: Card[];
  cardIdsToTest?: number[];
  numberOfCards: number;
  tagList?: Tag[];
}) {
  if (cardIdsToTest) {
    const ret: Card[] = [];
    cardIdsToTest.forEach((cardId) => {
      const card = cardList.find((c) => c.id === cardId);
      ret.push(card!);
    });
    return ret;
  }

  if (tagList) {
    const ret: Card[] = [];
    tagList.forEach((tag) => {
      tag.cardList.forEach((baseCard) => {
        const card = cardList.find((c) => c.id === baseCard.id);
        ret.push(card!);
      });
    });

    if (ret.length) {
      return ret;
    }
  }

  return cardList.slice(0, numberOfCards);
}

function shuffleCards(cards: Card[]): Card[] {
  return [...cards].sort(() => Math.random() - 0.5);
}

export const getCardMeta = (ts: TestSettings): CardMeta => {
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
