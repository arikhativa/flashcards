import * as React from "react";
import { useEffect } from "react";
import { Dimensions, Platform, View } from "react-native";
import { Text } from "react-native-paper";
import { useSharedValue } from "react-native-reanimated";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import CardTest from "./CardTest";
import { CardMeta, TestSettings } from "@/types/TestSettings";
import { Card } from "@/types/Card";
import { useStore } from "@/providers/GlobalStore";
import { baseUnit, padding } from "@/constants/styles";
import TestFinish from "./TestFinish";
import { KnowledgeLevel } from "@/types/KnowledgeLevel";
import { generateSmallList } from "@/utils/cardPicker";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

interface TestManagerProps {
  matchingCards: Card[];
  testSettings: TestSettings;
}

const AUTO_SCROLL_DELAY = 1000;

export default function TestManager({
  matchingCards,
  testSettings,
}: TestManagerProps) {
  const { cardService } = useStore();
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const [data, setData] = React.useState<number[]>([]);

  const [randomCards, setRandomCards] = React.useState<Card[]>([]);
  const randomCardsRef = React.useRef(randomCards);

  useEffect(() => {
    randomCardsRef.current = randomCards;
  }, [randomCards]);

  const [cardsMeta, setCardsMeta] = React.useState<CardMeta[]>([]);
  const cardsMetaRef = React.useRef(cardsMeta);

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
      setData([...new Array(randomCards.length + 1).keys()]);
      const list: CardMeta[] = [];
      randomCards.forEach((_card) => {
        list.push(getCardMeta(testSettings));
      });
      setCardsMeta(list);
    }
  }, [randomCards]);

  const updateDB = () => {
    const list = getUpdateCardList(
      randomCardsRef.current,
      cardsMetaRef.current
    );
    if (!list || list.length === 0) {
      console.error("TestManager, updateDB no cards to update");
      return;
    }
    cardService.updateMany(list);
  };

  const getCardMeta = (ts: TestSettings): CardMeta => {
    if (ts.testSide === "Both") {
      const randomValue = Math.random() < 0.5 ? 0 : 1;
      return {
        hideSideA: randomValue === 0,
        hideSideB: randomValue === 1,
        answer: "",
      };
    }
    if (ts.testSide === "A") {
      return {
        answer: "",
        hideSideA: true,
      };
    }
    return {
      answer: "",
      hideSideB: true,
    };
  };

  const updateAnswer = (index: number, newAnswer: string) => {
    setCardsMeta((prev) =>
      prev.map((card, i) =>
        i === index ? { ...card, answer: newAnswer } : card
      )
    );
  };

  const updateSuccess = (index: number, newSuccess: boolean) => {
    if (cardsMeta[index].success === undefined) {
      // TODO make sure this will not run if the user already changed pages

      setTimeout(() => scrollToNextPage(), AUTO_SCROLL_DELAY);
    }
    setCardsMeta((prev) =>
      prev.map((card, i) =>
        i === index ? { ...card, success: newSuccess } : card
      )
    );
  };

  const updateKL = (index: number, newKL: KnowledgeLevel) => {
    setRandomCards((prev) =>
      prev.map((card, i) =>
        i === index ? { ...card, knowledgeLevel: newKL } : card
      )
    );
  };

  const scrollToNextPage = () => {
    if (ref.current) {
      ref.current.next();
    }
  };

  const scrollToFirstPage = () => {
    if (ref.current) {
      ref.current.scrollTo({
        index: 0,
        animated: true,
      });
    }
  };

  const handleRetakeTest = () => {
    scrollToFirstPage();
    updateDB();
  };

  const getChild = (index: number) => {
    if (!randomCards.length || !cardsMeta.length) {
      return <Text>No Cards</Text>; // TODO make this better
    }
    if (index < randomCards.length) {
      return (
        <CardTest
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
          cards={randomCards}
          cardsMeta={cardsMeta}
          onChangeKnowledgeLevel={updateKL}
          onRetakeTest={handleRetakeTest}
        />
      );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Carousel
        loop={false}
        ref={ref}
        width={width}
        height={height}
        data={data}
        onProgressChange={(_, absoluteProgress) => {
          progress.value = absoluteProgress;
        }}
        renderItem={({ index }) => (
          <View
            style={[
              padding.top3,
              {
                flex: 1,
                justifyContent: "flex-start",
              },
            ]}
          >
            {getChild(index)}
          </View>
        )}
      />
    </View>
  );
}

function getUpdateCardList(cards: Card[], cardsMeta: CardMeta[]): Card[] {
  return cards.map((card, index) => {
    const meta = cardsMeta[index];
    if (!meta) {
      console.error("getUpdateCardList invalid meta", meta);
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
