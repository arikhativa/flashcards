import { TestSettings } from '@/components/provider/TestProvider';
import { Card, Tag } from '@/db/schema';
import useCardList from '@/hooks/query/useCardList';
import { CardFilters, DEFAULT_CARD_FILTERS } from '@/hooks/query/useCardListFilters';
import useTagList from '@/hooks/query/useTagList';
import { TagFilters } from '@/hooks/query/useTagListFilters';
import { CardMeta } from '@/lib/types';
import { useEffect, useMemo, useState } from 'react';

export default function useCreateTestMetadata(ts: TestSettings) {
  const [cardsToTest, setCardsToTest] = useState<Card[]>([]);
  const [metadataList, setMetadataList] = useState<CardMeta[]>([]);

  const filters = useMemo<CardFilters>(
    () => ({
      ...DEFAULT_CARD_FILTERS,
      orderBy: 'TestedTime',
      direction: 'Asc',
      dateRange: ts.range,
    }),
    [ts.range]
  );

  const tagFilters = useMemo<TagFilters>(() => ({ ids: ts.tagIdsToTest }), [ts]);

  const tagQuery = useTagList(tagFilters, !!ts.tagIdsToTest);

  const { data: cards, isSuccess } = useCardList(filters);

  useEffect(() => {
    let list = undefined;
    if (!!ts.tagIdsToTest && tagQuery.isSuccess && cards && isSuccess) {
      list = pickCardsToTest({ cardList: cards, ts, tagList: tagQuery.data });
    } else if (!ts.tagIdsToTest && cards && isSuccess) {
      list = pickCardsToTest({ cardList: cards, ts });
    }

    if (list) {
      setCardsToTest(shuffleCards(list));
    }
  }, [isSuccess, cards, ts, tagQuery.isSuccess, tagQuery.data]);

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

function pickCardsToTest({
  cardList,
  ts,
  tagList,
}: {
  cardList: Card[];
  ts: TestSettings;
  tagList?: Tag[];
}) {
  if (ts.cardIdsToTest) {
    const ret: Card[] = [];
    ts.cardIdsToTest.forEach((cardId) => {
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

  return cardList.slice(0, ts.numberOfCards);
}

function shuffleCards(cards: Card[]): Card[] {
  return [...cards].sort(() => Math.random() - 0.5);
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
