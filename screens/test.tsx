import React, {useEffect, useLayoutEffect, useState} from 'react';
import {EMPTY_TEST_SETTING, TestSettings} from '../types/TestSettings';
import TestManager from '../components/test/TestManager';
import {Card} from '../types/Card';
import {getMatchingCardsForTest} from '../utils/cardPicker';
import {useStore} from '../providers/GlobalStore';
import {rawStringArrayToIntArray} from '../utils/generic';
import {ObjType} from '../types/generic';
import {Tag} from '../types/Tag';
import TestForm from '../components/test/TestForm';
import {StackEndpoints} from '../navigation/MainStack';
import {RouteProp} from '@react-navigation/native';

export type TestParam = {
  ids: number[];
  type: ObjType;
};

interface Props {
  route: RouteProp<StackEndpoints, 'Test'>;
}

const TestScreen: React.FC = ({route}: Props) => {
  const {cards, tags, conf} = useStore();

  const {ids, type} = route.params;

  // const [ids, setIds] = useState<number[]>([]);
  const [isTestSetupDone, setIsTestSetupDone] = useState(false);
  const [testSettings, setTestSettings] =
    useState<TestSettings>(EMPTY_TEST_SETTING);

  const [matchingCards, setMatchingCards] = useState<Card[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useLayoutEffect(() => {
    let tagList: Tag[] = [];
    let numberOfCards = conf.numberOfCards;
    let testSide = conf.testSide;
    // if (rawIds) {
    //   const idsList = rawStringArrayToIntArray(rawIds);

    //   if (idsList.length) {
    //     setIds(idsList);
    //     if (type === ObjType.Tag) {
    //       tagList = idsList.map(id => tags.find(tag => tag.id === id)!);
    //     } else {
    //       numberOfCards = idsList.length;
    //     }
    //   }
    // }

    setTestSettings({
      ...testSettings,
      numberOfCards: numberOfCards,
      testSide: testSide,
      selectedTags: tagList,
    });

    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (ids.length && type === ObjType.Card) {
      const list = getCardsById(ids);
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
    if (type === ObjType.Card && ids.length) {
      return ids;
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
