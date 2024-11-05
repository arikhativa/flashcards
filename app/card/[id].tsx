import { View, StyleSheet } from "react-native";
import { Card } from "@/types/Card";
import { Button, Text, TextInput } from "react-native-paper";
import { Card as PaperCard } from "react-native-paper";
import { Divider } from "react-native-paper";
import { baseUnit, padding } from "@/constants/styles";
import { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useStore } from "@/providers/GlobalStore";

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

  const handleLocalChange = (field: keyof Card, value: string) => {
    setCardLocal({ ...cardLocal, [field]: value });
  };

  return (
    <View>
      <PaperCard style={styles.cardContainer}>
        <PaperCard.Content>
          <View style={styles.sideView}>
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
          <View style={styles.sideView}>
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
      <PaperCard style={styles.cardContainer}>
        <PaperCard.Actions>
          <Button mode={"contained"} onPress={handleSubmit}>
            Save
          </Button>
        </PaperCard.Actions>
      </PaperCard>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: { margin: baseUnit },
  sideView: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    height: 200,
  },
  labelText: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  textInput: { width: "50%" },
});

export default CardComponent;
