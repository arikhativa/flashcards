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

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

interface TestManagerProps {
  testSettings: TestSettings;
}

export default function TestManager({ testSettings }: TestManagerProps) {
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const { cards } = useStore();
  const [randomCards, setRandomCards] = React.useState<Card[]>(cards);
  const [cardsMeta, setCardsMeta] = React.useState<CardMeta[]>([]);
  const [data, setData] = React.useState<number[]>([]);

  useEffect(() => {
    setData([...new Array(randomCards.length).keys()]);

    const tmp: CardMeta[] = [];
    randomCards.forEach((card) => {
      tmp.push(getCardMeta(testSettings));
    });
    setCardsMeta(tmp);
  }, []);

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
    setCardsMeta((prevCardsMeta) =>
      prevCardsMeta.map((card, i) =>
        i === index ? { ...card, answer: newAnswer } : card
      )
    );
  };
  const updateSuccess = (index: number, newSuccess: boolean) => {
    setCardsMeta((prevCardsMeta) =>
      prevCardsMeta.map((card, i) =>
        i === index ? { ...card, success: newSuccess } : card
      )
    );
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
            {randomCards.length && cardsMeta.length && (
              <CardTest
                index={index}
                length={randomCards.length}
                card={randomCards[index]}
                cardMeta={cardsMeta[index]}
                onChangeAnswer={updateAnswer}
                onChangeSuccess={updateSuccess}
                hideSideA={
                  cardsMeta.length ? cardsMeta[index].hideSideA : undefined
                }
                hideSideB={
                  cardsMeta.length ? cardsMeta[index].hideSideB : undefined
                }
              />
            )}
          </View>
        )}
      />
    </View>
  );
}
