import { View, StyleSheet, ScrollView } from "react-native";
import { Card } from "@/types/Card";
import { Button, RadioButton, Text, TextInput } from "react-native-paper";
import { Card as PaperCard } from "react-native-paper";
import { Divider } from "react-native-paper";
import { baseUnit, padding } from "@/constants/styles";
import { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useStore } from "@/providers/GlobalStore";
import { KnowledgeLevel, KnowledgeLevelColors } from "@/types/KnowledgeLevel";

type CardDetailParams = {
  id: string;
};

const CardComponent: React.FC = () => {
  const { cards, conf, cardService } = useStore();
  const { id } = useLocalSearchParams<CardDetailParams>();
  const navigation = useNavigation();

  const [cardLocal, setCardLocal] = useState<Card>({} as Card);

  useEffect(() => {
    if (!id) {
      console.error("Bad Card ID");
      return;
    }

    navigation.setOptions({ title: `Card ${id}` });

    const idNumber = parseInt(id, 10);

    const card = cards.find((card) => card.id === idNumber);

    if (!card) {
      console.error("Card not found");
      return;
    }

    setCardLocal(card);
  }, [id, navigation, cards]);

  const handleSubmit = async () => {
    await cardService.update(cardLocal.id, cardLocal);
    navigation.goBack();
  };

  const getKLStyle = () => {
    switch (cardLocal.knowledgeLevel) {
      case KnowledgeLevel.Learning:
        return styles.Learning;
      case KnowledgeLevel.GettingThere:
        return styles.GettingThere;
      case KnowledgeLevel.Confident:
        return styles.Confident;
      default:
        return {};
    }
  };

  const handleLocalChange = (field: keyof Card, value: string) => {
    setCardLocal({ ...cardLocal, [field]: value });
  };

  return (
    <ScrollView>
      <PaperCard style={[styles.cardContainer, getKLStyle()]}>
        <PaperCard.Content>
          <View style={[styles.sideView, styles.sideViewHeightA]}>
            <Text style={styles.labelText} variant="titleLarge">
              {conf.sideA}
            </Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => {
                handleLocalChange("sideA", text);
              }}
              value={cardLocal.sideA}
            ></TextInput>
          </View>
          <Divider></Divider>
          <View style={[styles.sideView, styles.sideViewHeightB]}>
            <Text style={[styles.labelText, padding.top]} variant="titleLarge">
              {conf.sideB}
            </Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => {
                handleLocalChange("sideB", text);
              }}
              value={cardLocal.sideB}
            ></TextInput>
          </View>
        </PaperCard.Content>
      </PaperCard>

      <PaperCard style={[styles.cardContainer]}>
        <PaperCard.Content>
          <Text variant="titleMedium">Comment</Text>
          <TextInput
            multiline
            numberOfLines={4}
            onChangeText={(text) => {
              handleLocalChange("comment", text);
            }}
            value={cardLocal.comment}
          ></TextInput>
        </PaperCard.Content>
      </PaperCard>

      <PaperCard style={[styles.cardContainer]}>
        <PaperCard.Content style={[styles.KLRadioContainer]}>
          <Text variant="titleMedium">Knowledge Level</Text>
          <View style={styles.KLRadio}>
            <RadioButton
              value={KnowledgeLevel.Learning}
              uncheckedColor={KnowledgeLevelColors.Learning}
              color={KnowledgeLevelColors.Learning}
              status={
                cardLocal.knowledgeLevel === KnowledgeLevel.Learning
                  ? "checked"
                  : "unchecked"
              }
              onPress={() =>
                handleLocalChange("knowledgeLevel", KnowledgeLevel.Learning)
              }
            />
            <RadioButton
              value={KnowledgeLevel.GettingThere}
              uncheckedColor={KnowledgeLevelColors.GettingThere}
              color={KnowledgeLevelColors.GettingThere}
              status={
                cardLocal.knowledgeLevel === KnowledgeLevel.GettingThere
                  ? "checked"
                  : "unchecked"
              }
              onPress={() =>
                handleLocalChange("knowledgeLevel", KnowledgeLevel.GettingThere)
              }
            />
            <RadioButton
              value={KnowledgeLevel.Confident}
              uncheckedColor={KnowledgeLevelColors.Confident}
              color={KnowledgeLevelColors.Confident}
              status={
                cardLocal.knowledgeLevel === KnowledgeLevel.Confident
                  ? "checked"
                  : "unchecked"
              }
              onPress={() =>
                handleLocalChange("knowledgeLevel", KnowledgeLevel.Confident)
              }
            />
          </View>
        </PaperCard.Content>
      </PaperCard>
      <PaperCard style={styles.cardContainer}>
        <PaperCard.Actions>
          <Button mode={"contained"} onPress={handleSubmit}>
            Save
          </Button>
        </PaperCard.Actions>
      </PaperCard>
    </ScrollView>
  );
};

const HEIGHT = 200;
const BORDER_SIZE = 30;

const styles = StyleSheet.create({
  KLRadioContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  KLRadio: {
    display: "flex",
    flexDirection: "row",
  },
  cardContainer: {
    margin: baseUnit,
  },
  Learning: {
    borderBottomColor: KnowledgeLevelColors.Learning,
    borderBottomWidth: BORDER_SIZE,
  },
  GettingThere: {
    borderBottomColor: KnowledgeLevelColors.GettingThere,
    borderBottomWidth: BORDER_SIZE,
  },
  Confident: {
    borderBottomColor: KnowledgeLevelColors.Confident,
    borderBottomWidth: BORDER_SIZE,
  },
  sideViewHeightA: {
    height: HEIGHT,
  },
  sideViewHeightB: {
    height: HEIGHT - BORDER_SIZE,
  },
  sideView: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  labelText: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  textInput: { width: "50%" },
});

export default CardComponent;
