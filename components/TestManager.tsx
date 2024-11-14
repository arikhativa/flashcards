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
import { generateCardsForTest } from "@/utils/cardPicker";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

interface TestManagerProps {
  testSettings: TestSettings;
}

const AUTO_SCROLL_DELAY = 1000;

export default function TestManager({ testSettings }: TestManagerProps) {
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const { cards } = useStore();
  const [randomCards, setRandomCards] = React.useState<Card[]>([]);
  const [cardsMeta, setCardsMeta] = React.useState<CardMeta[]>([]);
  const [data, setData] = React.useState<number[]>([]);

  useEffect(() => {
    const list = generateCardsForTest(cards, testSettings);
    setRandomCards(list);
  }, []);

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

  const getChilde = (index: number) => {
    if (!randomCards.length || !cardsMeta.length) {
      return <>loading</>;
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
            {getChilde(index)}
          </View>
        )}
      />
    </View>
  );
}
