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
import { ComponentProps, CRUDMode } from "@/types/generic";
import { useNavigation } from "@react-navigation/native";
import { CardService } from "@/services/Card";
import { BAD_ID } from "@/constants/general";
import CardSides from "./CardSides";

type CardComponentProps = ComponentProps<Card>;

const CardComponent = ({ mode, data, id }: CardComponentProps) => {
  const { cards, tags, cardService } = useStore();
  const navigation = useNavigation();

  let idLocal: number = parseInt(id || "-1", 10);
  const [cardLocal, setCardLocal] = useState<Card | CardCreate | CardUpdate>(
    {} as Card | CardCreate | CardUpdate
  );

  useEffect(() => {
    if (mode === CRUDMode.Create) {
      navigation.setOptions({ title: "New Card" });
      const cardCreate: CardCreate = CardService.EMPTY;
      setCardLocal(cardCreate);
      return;
    }

    if (mode === CRUDMode.Update) {
      navigation.setOptions({ title: `Edit Card` });

      if (idLocal === BAD_ID) {
        console.error("CardComponent: invalid Card id, idLocal", id, idLocal);
        return;
      }

      const cardUpdate = cards.find((card) => card.id === idLocal);

      if (!cardUpdate) {
        console.error("CardComponent: Card not found");
        return;
      }
      setCardLocal(cardUpdate);
      return;
    }

    if (mode === CRUDMode.Read) {
      if (!data) {
        console.error("CardComponent: invalid Card");
        return;
      }
      setCardLocal(data);
      return;
    }
  }, []);

  const setKL = (kl: KnowledgeLevel) => {
    handleLocalChange("knowledgeLevel", kl);
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

  const handleSubmitCreate = async (card: CardCreate) => {
    if (mode !== CRUDMode.Create) return;
    await cardService.create(card);
    navigation.goBack();
  };

  const handleSubmitUpdate = async (card: CardUpdate) => {
    if (!id || mode !== CRUDMode.Update) return;
    await cardService.update(idLocal, card);
    navigation.goBack();
  };

  const handleSubmitDelete = async () => {
    if (!id || mode !== CRUDMode.Update) return;
    await cardService.delete(idLocal);
    navigation.goBack();
  };

  const isDisable = (): boolean => {
    return mode === CRUDMode.Read;
  };

  const getSuccess = (): number => {
    const card = cardLocal as Card;
    return card.succuss || 0;
  };

  const getFailure = (): number => {
    const card = cardLocal as Card;
    return card.failure || 0;
  };

  return (
    <ScrollView>
      <CardSides
        style={margin.base2}
        disabled={isDisable()}
        knowledgeLevel={cardLocal.knowledgeLevel}
        sideA={cardLocal.sideA}
        sideB={cardLocal.sideB}
        onChangeTextA={(text) => handleLocalChange("sideA", text)}
        onChangeTextB={(text) => handleLocalChange("sideB", text)}
      />

      <View style={[margin.base2]}>
        <Text style={padding.bottom} variant="titleMedium">
          Comment
        </Text>
        {/* TODO */}
        <Text style={padding.bottom} variant="titleMedium">
          Success {getSuccess()}
        </Text>
        <Text style={padding.bottom} variant="titleMedium">
          Failure {getFailure()}
        </Text>
        {/* TODO */}
        <PaperCard>
          <PaperCard.Content>
            <TextInput
              disabled={isDisable()}
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
        style={[margin.base2]}
        disabled={isDisable()}
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
            <View
              style={styles.KLRadio}
              pointerEvents={isDisable() ? "none" : "auto"}
            >
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
              onPress={() => handleSubmitUpdate(cardLocal as CardUpdate)}
            >
              Save
            </Button>
          )}
          {mode === CRUDMode.Create && (
            <Button
              mode={"contained"}
              onPress={() => handleSubmitCreate(cardLocal as CardCreate)}
            >
              Create
            </Button>
          )}
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
  comment: {
    backgroundColor: "transparent",
  },
  textInput: {
    width: "90%",
    textAlign: "center",
  },
});

export default CardComponent;
