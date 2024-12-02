import React, {useEffect, useLayoutEffect, useState} from 'react';
import {EMPTY_TEST_SETTING, TestSettings} from '../types/TestSettings';
import TestManager from '../components/test/TestManager';
import {Card} from '../types/Card';
import {getMatchingCardsForTest} from '../utils/cardPicker';
import {useStore} from '../providers/GlobalStore';
import {ObjType} from '../types/generic';
import {Tag} from '../types/Tag';
import TestForm from '../components/test/TestForm';
import {StackEndpoints} from '../navigation/MainStack';
import {RouteProp} from '@react-navigation/native';

export type TestParam = {
  cardIds: number[];
  tagIds: number[];
  type: ObjType;
};

interface Props {
  route: RouteProp<StackEndpoints, 'Test'>;
}

const TestScreen: React.FC = ({route}: Props) => {
  const {cards, tags, conf} = useStore();

  const {cardIds, tagIds, type} = route.params;

  const [isTestSetupDone, setIsTestSetupDone] = useState(false);
  const [testSettings, setTestSettings] =
    useState<TestSettings>(EMPTY_TEST_SETTING);

  const [matchingCards, setMatchingCards] = useState<Card[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useLayoutEffect(() => {
    let tagList: Tag[] = [];
    let numberOfCards = conf.numberOfCards;
    let testSide = conf.testSide;
    if (cardIds.length) {
      numberOfCards = cardIds.length;
    }
    if (tagIds.length) {
      tagList = tagIds.map(id => tags.find(tag => tag.id === id)!);
    }

    setTestSettings({
      ...testSettings,
      numberOfCards: numberOfCards,
      testSide: testSide,
      selectedTags: tagList,
    });

    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (cardIds.length && type === ObjType.Card) {
      const list = getCardsById(cardIds);
      setMatchingCards(list);
    } else {
      const list = getMatchingCardsForTest(cards, testSettings);
      setMatchingCards(list);
    }
  }, [cards, testSettings]);

  const getCardsById = (ids: number[]): Card[] => {
    return ids.map(id => cards.find(card => card.id === id)!);
  };

  const getPreSelectedCards = (): number[] => {
    if (type === ObjType.Card && cardIds.length) {
      return cardIds;
    }
    return [];
  };

  if (!isInitialized) {
    return null;
  }

  return (
    <>
      {isTestSetupDone ? (
        <TestManager
          matchingCards={matchingCards}
          testSettings={testSettings}
        />
      ) : (
        <TestForm
          preSelectedCards={getPreSelectedCards()}
          matchingCards={matchingCards}
          testSettings={testSettings}
          setTestSettings={setTestSettings}
          onSubmit={() => setIsTestSetupDone(true)}
        />
      )}
    </>
  );
};

export default TestScreen;
