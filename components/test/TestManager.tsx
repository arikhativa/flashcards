import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import CardTest, {CardTestRef} from './CardTest';
import {CardMeta, TestSettings} from '../../types/TestSettings';
import {Card} from '../../types/Card';
import {useStore} from '../../providers/GlobalStore';
import {padding} from '../../constants/styles';
import TestFinish from './TestFinish';
import {KnowledgeLevel} from '../../types/KnowledgeLevel';
import {generateSmallList} from '../../utils/cardPicker';
import CarouselWrapper, {CarouselWrapperRef} from '../shared/CarouselWrapper';
import {useNavigation} from '@react-navigation/native';
import {RootStack} from '../../navigation/MainStack';
import {ObjType} from '../../types/generic';

interface TestManagerProps {
  matchingCards: Card[];
  testSettings: TestSettings;
}

const AUTO_SCROLL_DELAY = 1000;

export default function TestManager({
  matchingCards,
  testSettings,
}: TestManagerProps) {
  const {cardService} = useStore();
  const navigation = useNavigation<RootStack>();

  const carouselWrapperRef = useRef<CarouselWrapperRef>(null);
  const cardTestRef = useRef<CardTestRef[]>([]);

  const [randomCards, setRandomCards] = useState<Card[]>([]);
  const randomCardsRef = useRef(randomCards);

  useEffect(() => {
    randomCardsRef.current = randomCards;
  }, [randomCards]);

  const [cardsMeta, setCardsMeta] = useState<CardMeta[]>([]);
  const cardsMetaRef = useRef(cardsMeta);

  useEffect(() => {
    cardsMetaRef.current = cardsMeta;
  }, [cardsMeta]);

  useEffect(() => {
    return updateDB;
  }, []);

  useEffect(() => {
    const list = generateSmallList(matchingCards, testSettings);
    setRandomCards(list);
  }, [testSettings, matchingCards]);

  useEffect(() => {
    if (cardsMeta.length === 0) {
      const list: CardMeta[] = [];
      randomCards.forEach(_card => {
        list.push(getCardMeta(testSettings));
      });
      setCardsMeta(list);
    }
  }, [randomCards]);

  const updateDB = () => {
    const list = getUpdateCardList(
      randomCardsRef.current,
      cardsMetaRef.current,
    );
    if (!list || list.length === 0) {
      console.error('TestManager, updateDB no cards to update');
      return;
    }
    cardService.updateMany(list);
  };

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

  const updateAnswer = (index: number, newAnswer: string) => {
    setCardsMeta(prev =>
      prev.map((card, i) =>
        i === index ? {...card, answer: newAnswer} : card,
      ),
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
    setCardsMeta(prev =>
      prev.map((card, i) =>
        i === index ? {...card, success: newSuccess} : card,
      ),
    );
  };

  const updateKL = (index: number, newKL: KnowledgeLevel) => {
    setRandomCards(prev =>
      prev.map((card, i) =>
        i === index ? {...card, knowledgeLevel: newKL} : card,
      ),
    );
  };

  const scrollToNextPage = () => {
    if (carouselWrapperRef.current) {
      carouselWrapperRef.current.scrollToNextPage();

      if (
        cardTestRef.current &&
        carouselWrapperRef.current.currentIndex() + 1 <
          cardTestRef.current.length
      ) {
        cardTestRef.current[
          carouselWrapperRef.current.currentIndex() + 1
        ].focusOnTextInput();
      }
    }
  };

  const scrollToPage = (index: number) => {
    if (carouselWrapperRef.current) {
      carouselWrapperRef.current.scrollToPage(index);
      if (cardTestRef.current && index < cardTestRef.current.length) {
        cardTestRef.current[index].focusOnTextInput();
      }
    }
  };

  const handleRetakeTest = (list: Card[]) => {
    navigation.replace('Test', {
      cardIds: list.map(card => card.id),
      tagIds: [],
      type: ObjType.Card,
    });
  };

  const getChild = (index: number) => {
    if (!randomCards.length || !cardsMeta.length) {
      return <Text>No Cards</Text>; // TODO make this better
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
          hideSideB={cardsMeta.length ? cardsMeta[index].hideSideB : undefined}
        />
      );
    }
    if (index === randomCards.length) {
      return (
        <TestFinish
          scrollToPage={scrollToPage}
          cards={randomCards}
          cardsMeta={cardsMeta}
          onChangeKnowledgeLevel={updateKL}
          onRetakeTest={handleRetakeTest}
        />
      );
    }
  };

  const renderItem = ({index}: {index: number}) => {
    return (
      <View
        style={[
          padding.top3,
          {
            flex: 1,
            justifyContent: 'flex-start',
          },
        ]}>
        {getChild(index)}
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <CarouselWrapper
        ref={carouselWrapperRef}
        length={randomCards.length}
        renderItem={renderItem}
      />
    </View>
  );
}

function getUpdateCardList(cards: Card[], cardsMeta: CardMeta[]): Card[] {
  return cards.map((card, index) => {
    const meta = cardsMeta[index];
    if (!meta) {
      console.error('getUpdateCardList invalid meta', meta);
      return card;
    }
    if (cardsMeta[index].success === undefined) {
      return card;
    }
    return {
      ...card,
      succuss: cardsMeta[index].success ? card.succuss + 1 : card.succuss,
      failure: cardsMeta[index].success ? card.failure : card.failure + 1,
    };
  });
}
