import { View, StyleSheet, ScrollView } from "react-native";
import { Tag, TagCreate, TagUpdate } from "@/types/Tag";
import { Button, Card as CardPaper, Text, TextInput } from "react-native-paper";
import { margin } from "@/constants/styles";
import { useEffect, useState } from "react";
import { useStore } from "@/providers/GlobalStore";
import { KnowledgeLevel, KnowledgeLevelColor } from "@/types/KnowledgeLevel";
import { CRUDMode } from "@/types/generic";
import { useNavigation } from "@react-navigation/native";
import { TagService } from "@/services/Tag";
import { Card } from "@/types/Card";

type TagComponentProps = {
  mode: CRUDMode;
  data?: Tag;
  id?: string;
};

const BAD_ID = -1; // TODO this should be general

const TagComponent = ({ mode, data, id }: TagComponentProps) => {
  const { tags, tagService } = useStore();
  const navigation = useNavigation();

  let idLocal: number = parseInt(id || "-1", 10);
  const [tagLocal, setTagLocal] = useState<Tag | TagCreate | TagUpdate>(
    {} as Tag | TagCreate | TagUpdate
  );

  useEffect(() => {
    if (mode === CRUDMode.Create) {
      navigation.setOptions({ title: "New Tag" });
      const tagCreate: TagCreate = TagService.EMPTY;
      setTagLocal(tagCreate);
    } else if (mode === CRUDMode.Update) {
      navigation.setOptions({ title: `Edit Tag` });

      if (idLocal === BAD_ID) {
        console.error("TagComponent: invalid Tagid, idLocal", id, idLocal);
        return;
      }

      const tagUpdate = tags.find((tag) => tag.id === idLocal);

      if (!tagUpdate) {
        console.error("TagComponent: Tag not found");
        return;
      }

      setTagLocal(tagUpdate);
    } else if (mode === CRUDMode.Read) {
      if (!data) {
        console.error("TagComponent: invalid Tag");
        return;
      }

      setTagLocal(data);
    }
  }, []);

  const handleLocalChange = (field: keyof Tag, value: string) => {
    setTagLocal({ ...tagLocal, [field]: value });
  };

  const addCard = (card: Card) => {
    const currCards = tagLocal.cards || [];
    if (currCards.find((e) => e.id === card.id)) {
      console.error("tag already exists");
      return;
    }
    const newCards = [...currCards, card];
    setTagLocal({ ...tagLocal, cards: newCards });
  };

  const removeCard = (card: Card) => {
    const currCards = tagLocal.cards || [];
    if (!currCards.find((e) => e.id === card.id)) {
      console.error("tag does not exists: can't remove");
      return;
    }
    const newCards = currCards.filter((e) => e.id !== card.id);
    setTagLocal({ ...tagLocal, cards: newCards });
  };

  const handleSubmitCreate = async (tag: TagCreate) => {
    if (mode !== CRUDMode.Create) return;
    await tagService.create(tag);
    navigation.goBack();
  };

  const handleSubmitUpdate = async (tag: TagUpdate) => {
    if (!id || mode !== CRUDMode.Update) return;
    await tagService.update(idLocal, tag);
    navigation.goBack();
  };

  const handleSubmitDelete = async () => {
    if (!id || mode !== CRUDMode.Update) return;
    await tagService.delete(idLocal);
    navigation.goBack();
  };

  const getKLStyle = () => {
    if (!tagLocal.cards) {
      return;
    }
    const cardsLearning =
      tagLocal.cards?.filter(
        (card) => card.knowledgeLevel === KnowledgeLevel.Learning
      ).length || 0;
    const cardsGettingThere =
      tagLocal.cards?.filter(
        (card) => card.knowledgeLevel === KnowledgeLevel.GettingThere
      ).length || 0;
    const cardsConfident =
      tagLocal.cards?.filter(
        (card) => card.knowledgeLevel === KnowledgeLevel.Confident
      ).length || 0;

    // cardsLearning
    if (cardsLearning > cardsGettingThere && cardsLearning > cardsConfident) {
      return styles.Learning;
    }
    // cardsGettingThere
    if (
      cardsGettingThere > cardsLearning &&
      cardsGettingThere > cardsConfident
    ) {
      return styles.GettingThere;
    }
    return styles.Confident;
  };

  return (
    <ScrollView>
      <CardPaper style={[margin.base2, getKLStyle()]}>
        <CardPaper.Content>
          <View style={[styles.sideView, styles.sideViewHeightA]}>
            <Text style={styles.labelText} variant="titleLarge">
              Name
            </Text>
            <TextInput
              style={[styles.textInput]}
              onChangeText={(text) => {
                handleLocalChange("name", text);
              }}
              value={tagLocal.name}
            ></TextInput>
          </View>
        </CardPaper.Content>
      </CardPaper>

      {/* 
      <TagsSection
        addCard={addCard}
        removeTag={removeTag}
        tags={tagLocal.cards}
        allTags={tags}
      /> */}

      <CardPaper style={margin.base2}>
        <CardPaper.Actions>
          {mode === CRUDMode.Update && (
            <Button
              buttonColor="red"
              mode={"contained"}
              onPress={() => handleSubmitDelete()}
            >
              Delete
            </Button>
          )}
          {mode === CRUDMode.Update && (
            <Button
              mode={"contained"}
              onPress={() => handleSubmitUpdate(tagLocal as TagUpdate)}
            >
              Save
            </Button>
          )}
          {mode === CRUDMode.Create && (
            <Button
              mode={"contained"}
              onPress={() => handleSubmitCreate(tagLocal as TagCreate)}
            >
              Create
            </Button>
          )}
        </CardPaper.Actions>
      </CardPaper>
    </ScrollView>
  );
};

const HEIGHT = 200;
const BORDER_SIZE = 30;

const styles = StyleSheet.create({
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
  textInput: {
    backgroundColor: "transparent",
    width: "90%",
    textAlign: "center",
  },
});

export default TagComponent;
