import { View, StyleSheet } from "react-native";
import { Tag, TagCreate, TagUpdate } from "@/types/Tag";
import { Card as PaperCard, TextInput } from "react-native-paper";
import { container, KLMark, margin } from "@/constants/styles";
import { useEffect } from "react";
import { useStore } from "@/providers/GlobalStore";
import { KnowledgeLevel } from "@/types/KnowledgeLevel";
import { ComponentProps, CRUDMode } from "@/types/generic";
import { useNavigation } from "@react-navigation/native";
import { TagService } from "@/services/Tag";
import { Card } from "@/types/Card";
import CardsSection from "./CardsSection";
import { BAD_ID } from "@/constants/general";
import { useMultiSelect } from "@/hooks/useMultiSelect";
import CRUDWrapper from "../shared/CRUDWrapper";
import { useStateDirty } from "@/hooks/useStateDirty";

type TagComponentProps = ComponentProps<Tag>;

const TagComponent = ({ mode, data, id }: TagComponentProps) => {
  const navigation = useNavigation();
  const { cards, tags, tagService } = useStore();
  const {
    isMultiSelect,
    selectedIds,
    selectedIdsRef,
    toggleIdSelection,
    clearSelectedIds,
    handelTestMany,
  } = useMultiSelect();

  let idLocal: number = parseInt(id || "-1", 10);

  const array = useStateDirty<Tag | TagCreate | TagUpdate>(
    {} as Tag | TagCreate | TagUpdate
  );
  const [tagLocal, setTagLocal] = array;

  useEffect(() => {
    if (mode === CRUDMode.Create) {
      navigation.setOptions({ title: "New Tag" });
      const tagCreate: TagCreate = TagService.EMPTY;
      tagCreate.cards = handleRawIds();
      setTagLocal(tagCreate);
    } else if (mode === CRUDMode.Update) {
      navigation.setOptions({ title: `Edit Tag` });

      if (idLocal === BAD_ID) {
        console.error("TagComponent: invalid Tag id, idLocal", id, idLocal);
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

  const handleRawIds = (): Card[] => {
    const tmpCards: Card[] = [];

    if (data?.cards) {
      const ids = data.cards as unknown as number[];

      ids.forEach((id) => {
        const card = cards.find((card) => card.id === id);
        if (card) {
          tmpCards.push(card);
        }
      });
      data.cards = tmpCards;
    }
    return tmpCards;
  };

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

  const handleRemoveCards = () => {
    if (!selectedIdsRef.current || selectedIdsRef.current.length === 0) {
      console.error("no cards selected");
      return;
    }

    const newCards = tagLocal.cards?.filter(
      (card) => !selectedIdsRef.current.includes(card.id)
    );

    setTagLocal({ ...tagLocal, cards: newCards });
    clearSelectedIds();
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
      return KLMark.Learning;
    }
    // cardsGettingThere
    if (
      cardsGettingThere > cardsLearning &&
      cardsGettingThere > cardsConfident
    ) {
      return KLMark.GettingThere;
    }
    return KLMark.Confident;
  };

  return (
    <CRUDWrapper
      array={array}
      mode={mode}
      id={idLocal}
      crudService={tagService}
      newTitle="New Tag"
      updateTitle="Edit Tag"
      deleteMessage="Delete Tag"
      empty={TagService.EMPTY}
      all={tags}
    >
      <View style={[container.flex1, margin.top2]}>
        <View style={[margin.base2]}>
          <PaperCard>
            <PaperCard.Content>
              <TextInput
                style={[{ height: 20 }, styles.textInput]}
                underlineColor="transparent"
                onChangeText={(text) => {
                  handleLocalChange("name", text);
                }}
                value={tagLocal.name}
              ></TextInput>
            </PaperCard.Content>
          </PaperCard>
        </View>

        <CardsSection
          onRemoveCardsFromTag={handleRemoveCards}
          onTestMany={handelTestMany}
          isMultiSelect={isMultiSelect}
          selectedIds={selectedIds}
          toggleIdSelection={toggleIdSelection}
          addCard={addCard}
          clearSelectedIds={clearSelectedIds}
          cards={tagLocal.cards as Card[]}
          allCards={cards}
        />
      </View>
    </CRUDWrapper>
  );
};

const styles = StyleSheet.create({
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
    textAlign: "center",
  },
});

export default TagComponent;
