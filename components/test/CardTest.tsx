import { Dimensions, View } from "react-native";
import { Text, IconButton, TextInput } from "react-native-paper";
import CardSides from "../shared/CardSides";
import { Card } from "@/types/Card";
import { margin } from "@/constants/styles";
import { CardMeta } from "@/types/TestSettings";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { useStore } from "@/providers/GlobalStore";

export interface CardTestRef {
  focusOnTextInput: () => void;
}

interface CardTestProps {
  hideSideA?: boolean;
  hideSideB?: boolean;
  card: Card;
  cardMeta: CardMeta;
  onChangeAnswer: (index: number, text: string) => void;
  onChangeSuccess: (index: number, success: boolean) => void;
  index: number;
  length: number;
}

const CardTest = forwardRef<CardTestRef, CardTestProps>(
  (
    {
      card,
      hideSideA,
      hideSideB,
      index,
      length,
      cardMeta,
      onChangeAnswer,
      onChangeSuccess,
    },
    ref
  ) => {
    const [showAnswer, setShowAnswer] = useState(false);
    const [showBtnColor, setShowBtnColor] = useState<boolean | undefined>(
      undefined
    );

    const { keyboardHeight } = useStore();
    const containerHeight = Dimensions.get("window").height - keyboardHeight;
    const cardHeight = containerHeight / 4;
    const paddingHeight = containerHeight / 60;

    const inputRef = useRef(null);

    useImperativeHandle(ref, () => ({
      focusOnTextInput: () => {
        if (inputRef.current) {
          (inputRef.current as any).focus();
        }
      },
    }));

    return (
      <View style={{ height: containerHeight }}>
        <Text
          variant="titleLarge"
          style={{ alignSelf: "center", paddingVertical: paddingHeight }}
        >
          {index + 1}/{length}
        </Text>
        <CardSides
          disabled
          cardHeight={cardHeight}
          style={margin.x2}
          knowledgeLevel={card.knowledgeLevel}
          sideA={card.sideA}
          sideB={card.sideB}
          hideSideA={showAnswer ? false : hideSideA}
          hideSideB={showAnswer ? false : hideSideB}
        />
        <View
          style={[
            margin.base2,
            {
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            },
          ]}
        >
          <TextInput
            ref={inputRef}
            style={[{ flex: 1 }, margin.right]}
            value={cardMeta.answer}
            onChangeText={(v: string) => {
              onChangeAnswer(index, v);
            }}
            label="Answer"
          ></TextInput>
          <IconButton
            mode="contained"
            icon="eye-outline"
            onPress={() => setShowAnswer(true)}
          ></IconButton>
        </View>
        <View
          style={[
            margin.x2,
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            },
          ]}
        >
          <Text variant="titleMedium">Did you get it right?</Text>
          <View
            style={[
              {
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <IconButton
              selected={showBtnColor && !cardMeta.success}
              disabled={!showAnswer}
              mode="contained"
              icon="close"
              onPress={() => {
                onChangeSuccess(index, false);
                setShowBtnColor(true);
              }}
            ></IconButton>
            <IconButton
              selected={showBtnColor && cardMeta.success}
              disabled={!showAnswer}
              mode="contained"
              icon="check"
              onPress={() => {
                onChangeSuccess(index, true);
                setShowBtnColor(true);
              }}
            ></IconButton>
          </View>
        </View>
      </View>
    );
  }
);

CardTest.displayName = "CardTest";

export default CardTest;
