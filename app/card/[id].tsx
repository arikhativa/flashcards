import { View, StyleSheet, ScrollView } from "react-native";
import { Card } from "@/types/Card";
import { Button, Text, TextInput } from "react-native-paper";
import { Card as PaperCard } from "react-native-paper";
import { Divider } from "react-native-paper";
import { margin, padding } from "@/constants/styles";
import { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useStore } from "@/providers/GlobalStore";
import { KnowledgeLevel, KnowledgeLevelColor } from "@/types/KnowledgeLevel";
import TagsSection from "@/components/TagsSection";
import { Tag } from "@/types/Tag";
import { CardRadio } from "@/components/CardRadio";

type CardDetailParams = {
  id: string;
};

const CardComponent: React.FC = () => {
  const { cards, tags, conf, cardService } = useStore();
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

  const setKL = (kl: KnowledgeLevel) => {
    handleLocalChange("knowledgeLevel", kl);
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

  const addTag = (tag: Tag) => {
    if (cardLocal.tags.find((t) => t.id === tag.id)) {
      console.error("tag already exists");
      return;
    }
    const newTags = [...cardLocal.tags, tag];
    setCardLocal({ ...cardLocal, tags: newTags });
  };

  return (
    <ScrollView>
      <PaperCard style={[margin.base2, getKLStyle()]}>
        <PaperCard.Content>
          <View style={[styles.sideView, styles.sideViewHeightA]}>
            <Text style={styles.labelText} variant="titleLarge">
              {conf.sideA}
            </Text>
            <TextInput
              style={[styles.comment, styles.textInput]}
              underlineColor="transparent"
              activeUnderlineColor="transparent"
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
              style={[styles.comment, styles.textInput]}
              underlineColor="transparent"
              activeUnderlineColor="transparent"
              onChangeText={(text) => {
                handleLocalChange("sideB", text);
              }}
              value={cardLocal.sideB}
            ></TextInput>
          </View>
        </PaperCard.Content>
      </PaperCard>

      <View style={[margin.base2]}>
        <Text style={padding.bottom} variant="titleMedium">
          Comment
        </Text>
        <PaperCard>
          <PaperCard.Content>
            <TextInput
              style={styles.comment}
              underlineColor="transparent"
              activeUnderlineColor="transparent"
              multiline
              numberOfLines={4}
              onChangeText={(text) => {
                handleLocalChange("comment", text);
              }}
              value={cardLocal.comment}
            ></TextInput>
          </PaperCard.Content>
        </PaperCard>
      </View>

      <TagsSection addTag={addTag} tags={cardLocal.tags} allTags={tags} />

      <View style={[margin.base2]}>
        <Text style={padding.bottom} variant="titleMedium">
          Knowledge Level
        </Text>
        <PaperCard>
          <PaperCard.Content style={[styles.KLRadioContainer]}>
            <View style={styles.KLRadio}>
              <CardRadio
                level={KnowledgeLevel.Learning}
                cardKL={cardLocal.knowledgeLevel}
                onPress={setKL}
              />
              <CardRadio
                level={KnowledgeLevel.GettingThere}
                cardKL={cardLocal.knowledgeLevel}
                onPress={setKL}
              />
              <CardRadio
                level={KnowledgeLevel.Confident}
                cardKL={cardLocal.knowledgeLevel}
                onPress={setKL}
              />
            </View>
          </PaperCard.Content>
        </PaperCard>
      </View>

      <PaperCard style={margin.base2}>
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
    justifyContent: "center",
    alignItems: "center",
  },
  KLRadio: {
    display: "flex",
  },
  Learning: {
    borderBottomColor: KnowledgeLevelColor.Learning,
    borderBottomWidth: BORDER_SIZE,
  },
  GettingThere: {
    borderBottomColor: KnowledgeLevelColor.GettingThere,
    borderBottomWidth: BORDER_SIZE,
  },
  Confident: {
    borderBottomColor: KnowledgeLevelColor.Confident,
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
  comment: {
    backgroundColor: "transparent",
  },
  textInput: {
    width: "100%",
    textAlign: "center",
  },
});

export default CardComponent;
