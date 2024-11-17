import { Card } from "@/types/Card";
import { CardMeta } from "@/types/TestSettings";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { FAB, Text, Button } from "react-native-paper";
import { KnowledgeLevel } from "../types/KnowledgeLevel";
import TestFinishRow from "./TestFinishRow";
import { container, margin, padding } from "@/constants/styles";
import { getHomeHref } from "@/utils/links";
import { Card as PaperCard } from "react-native-paper";
import { useVisible } from "@/hooks/useVisibale";
import TestFinishDialog from "./TestFinishDialog";
import { Link } from "expo-router";

interface TestFinishProps {
  cards: Card[];
  cardsMeta: CardMeta[];
  onChangeKnowledgeLevel: (index: number, newKL: KnowledgeLevel) => void;
  onRetakeTest: () => void;
}

export default function TestFinish({
  cards,
  cardsMeta,
  onChangeKnowledgeLevel,
  onRetakeTest,
}: TestFinishProps) {
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const { visible, toggleVisible } = useVisible();

  useEffect(() => {
    let correct = 0;
    cardsMeta.forEach((cardMeta) => {
      if (cardMeta.success) {
        correct++;
      }
    });
    setCorrectAnswers(correct);
  }, [cardsMeta]);

  return (
    <View style={[margin.base2]}>
      <PaperCard>
        <PaperCard.Content>
          <Text
            style={[padding.bottom, { alignSelf: "center" }]}
            variant="headlineLarge"
          >
            Test Is Done!
          </Text>
          <Text
            style={[padding.bottom3, { alignSelf: "center" }]}
            variant="headlineMedium"
          >
            You got {correctAnswers}/{cards.length}!
          </Text>
        </PaperCard.Content>
        <PaperCard.Actions style={{ flexDirection: "column", gap: 40 }}>
          <Link href={getHomeHref()}>
            <Button>Done</Button>
          </Link>
          <Button onPress={onRetakeTest}>Retake Test</Button>
          <Button onPress={toggleVisible}>Adjust Knowledge Level</Button>
        </PaperCard.Actions>
      </PaperCard>
      <TestFinishDialog
        cards={cards}
        cardsMeta={cardsMeta}
        onChangeKnowledgeLevel={onChangeKnowledgeLevel}
        visible={visible}
        onDismiss={toggleVisible}
      />
    </View>
  );
}
