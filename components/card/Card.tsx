import { View, ScrollView } from "react-native";
import { Card, CardCreate, CardUpdate } from "@/types/Card";
import { Appbar, Text, TextInput } from "react-native-paper";
import { Card as PaperCard } from "react-native-paper";
import { margin, padding } from "@/constants/styles";
import { useEffect, useRef, useState } from "react";
import { useStore } from "@/providers/GlobalStore";
import { KnowledgeLevel } from "@/types/KnowledgeLevel";
import TagsSection from "@/components/shared/TagsSection";
import { Tag } from "@/types/Tag";
import { ComponentProps, CRUDMode } from "@/types/generic";
import { useNavigation } from "@react-navigation/native";
import { CardService } from "@/services/Card";
import { BAD_ID } from "@/constants/general";
import CardSides from "../shared/CardSides";
import KnowledgeLevelSection from "./KnowledgeLevelSection";
import ObjectHeader from "../shared/ObjectHeader";
import { useStateDirty } from "@/hooks/useStateDirty";

type CardComponentProps = ComponentProps<Card>;

const CardComponent = ({ mode, data, id }: CardComponentProps) => {
  const navigation = useNavigation();
  const { cards, tags, cardService } = useStore();
  const [title, setTitle] = useState("");

  let idLocal: number = id ? parseInt(id, 10) : BAD_ID;

  const [cardLocal, setCardLocal, isDirty, cleanDirt] = useStateDirty<
    Card | CardCreate | CardUpdate
  >({} as Card | CardCreate | CardUpdate);
  const cardLocalRef = useRef(cardLocal);

  useEffect(() => {
    cardLocalRef.current = cardLocal;
  }, [cardLocal]);

  useEffect(() => {
    if (mode === CRUDMode.Create) {
      setTitle("New Card");
      const cardCreate: CardCreate = CardService.EMPTY;
      setCardLocal(cardCreate);
      cleanDirt();
      return onUnmount;
    }

    if (mode === CRUDMode.Update) {
      setTitle("Edit Card");

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
      cleanDirt();
      return onUnmount;
    }

    if (mode === CRUDMode.Read) {
      if (!data) {
        console.error("CardComponent: invalid Card");
        return;
      }
      setCardLocal(data);
      cleanDirt();
      return;
    }
  }, []);

  const onUnmount = () => {
    if (isDirty.current) handleSubmit(cardLocalRef.current);
  };

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
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const handleSubmitUpdate = async (card: CardUpdate) => {
    if (!id || mode !== CRUDMode.Update) return;
    await cardService.update(idLocal, card);
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const handleSubmit = async (card: Card | CardCreate | CardUpdate) => {
    if (mode === CRUDMode.Read) {
      return;
    }

    if (mode === CRUDMode.Create) {
      await handleSubmitCreate(card as CardCreate);
      return;
    }

    if (mode === CRUDMode.Update) {
      await handleSubmitUpdate(card as CardUpdate);
      return;
    }
  };

  const handleSubmitDelete = async () => {
    if (!id || mode !== CRUDMode.Update) return;
    await cardService.delete(idLocal);
    cleanDirt();
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
    <ObjectHeader
      title={title}
      onDelete={handleSubmitDelete}
      deleteMessage="Delete Card"
    >
      <CardSides
        borderSize={20}
        cardHeight={120}
        style={margin.base2}
        disabled={isDisable()}
        knowledgeLevel={cardLocal.knowledgeLevel}
        sideA={cardLocal.sideA}
        sideB={cardLocal.sideB}
        onChangeTextA={(text) => handleLocalChange("sideA", text)}
        onChangeTextB={(text) => handleLocalChange("sideB", text)}
      />

      <View style={[margin.base2]}>
        {/* TODO */}
        <Text style={padding.bottom} variant="titleMedium">
          Success {getSuccess()}
        </Text>
        <Text style={padding.bottom} variant="titleMedium">
          Failure {getFailure()}
        </Text>
        {/* TODO */}
        <Text style={padding.bottom} variant="titleMedium">
          Comment
        </Text>
        <PaperCard>
          <PaperCard.Content>
            <TextInput
              disabled={isDisable()}
              style={{
                backgroundColor: "transparent",
              }}
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

      <KnowledgeLevelSection
        knowledgeLevel={cardLocal.knowledgeLevel}
        setKnowledgeLevel={setKL}
        disabled={isDisable()}
        style={margin.base2}
      />
    </ObjectHeader>
  );
};

export default CardComponent;
