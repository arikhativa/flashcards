import { View, StyleSheet, ScrollView } from "react-native";
import { Card, CardCreate, CardUpdate } from "@/types/Card";
import { Button, Text, TextInput } from "react-native-paper";
import { Card as PaperCard } from "react-native-paper";
import { Divider } from "react-native-paper";
import { margin, padding } from "@/constants/styles";
import { useEffect, useState } from "react";
import { useStore } from "@/providers/GlobalStore";
import { KnowledgeLevel, KnowledgeLevelColor } from "@/types/KnowledgeLevel";
import TagsSection from "@/components/TagsSection";
import { Tag } from "@/types/Tag";
import { CardRadio } from "@/components/CardRadio";

type CardComponentProps = {
  card: CardCreate | CardUpdate;
  handleSubmit: (card: CardCreate | CardUpdate) => Promise<void>;
  handleDelete?: () => Promise<void>;
};

const CardComponent = ({
  card,
  handleSubmit,
  handleDelete,
}: CardComponentProps) => {
  const { tags, conf } = useStore();

  const [cardLocal, setCardLocal] = useState<CardCreate | CardUpdate>(card);

  useEffect(() => {
    setCardLocal(card);
  }, [card]);

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
    const currTags = cardLocal.tags || [];
    if (currTags.find((t) => t.id === tag.id)) {
      console.error("tag already exists");
      return;
    }
    const newTags = [...currTags, tag];
    setCardLocal({ ...cardLocal, tags: newTags });
  };

  const removeTag = (tag: Tag) => {
    const currTags = cardLocal.tags || [];
    if (!currTags.find((t) => t.id === tag.id)) {
      console.error("tag does not exists: can't remove");
      return;
    }
    const newTags = currTags.filter((t) => t.id !== tag.id);
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
              numberOfLines={3}
              onChangeText={(text) => {
                handleLocalChange("comment", text);
              }}
              value={cardLocal.comment}
            ></TextInput>
          </PaperCard.Content>
        </PaperCard>
      </View>

      <TagsSection
        addTag={addTag}
        removeTag={removeTag}
        tags={cardLocal.tags}
        allTags={tags}
      />

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
          {handleDelete && (
            <Button
              buttonColor="red"
              mode={"contained"}
              onPress={() => handleDelete()}
            >
              Delete
            </Button>
          )}
          <Button mode={"contained"} onPress={() => handleSubmit(cardLocal)}>
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
    width: "90%",
    textAlign: "center",
  },
});

export default CardComponent;
