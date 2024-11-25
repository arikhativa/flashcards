import { Dimensions, ScrollView, View } from "react-native";
import { Card, CardCreate, CardUpdate } from "@/types/Card";
import { Text, TextInput } from "react-native-paper";
import { Card as PaperCard } from "react-native-paper";
import { margin, padding } from "@/constants/styles";
import { useStore } from "@/providers/GlobalStore";
import { KnowledgeLevel } from "@/types/KnowledgeLevel";
import TagsSection from "@/components/shared/TagsSection";
import { Tag } from "@/types/Tag";
import { ComponentProps, CRUDMode } from "@/types/generic";
import { CardService } from "@/services/Card";
import { BAD_ID } from "@/constants/general";
import CardSides from "../shared/CardSides";
import KnowledgeLevelSection from "./KnowledgeLevelSection";
import { useStateDirty } from "@/hooks/useStateDirty";
import CRUDWrapper from "../shared/CRUDWrapper";

type CardComponentProps = ComponentProps<Card>;

const CardComponent = ({ mode, data, id }: CardComponentProps) => {
  const { cards, tags, cardService } = useStore();

  let idLocal: number = id ? parseInt(id, 10) : BAD_ID;

  const array = useStateDirty<Card | CardCreate | CardUpdate>(
    {} as Card | CardCreate | CardUpdate
  );
  const [cardLocal, setCardLocal] = array;

  const setKL = (kl: KnowledgeLevel) => {
    handleLocalChange("knowledgeLevel", kl);
  };

  const handleLocalChange = (field: keyof Card, value: string) => {
    setCardLocal({ ...cardLocal, [field]: value });
  };

  const addTags = (tags: Tag[]) => {
    const currTags = cardLocal.tags || [];

    let newTags: Tag[] = [];

    tags.forEach((tag) => {
      if (currTags.find((t) => t.id === tag.id)) {
        console.error("tag already exists");
        return;
      }
      newTags.push(tag);
    });
    setCardLocal({ ...cardLocal, tags: [...currTags, ...newTags] });
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

  const { keyboardHeight } = useStore();
  const containerHeight = Dimensions.get("window").height - keyboardHeight;
  const cardHeight = containerHeight / 4;

  return (
    <CRUDWrapper
      array={array}
      mode={mode}
      id={idLocal}
      crudService={cardService}
      newTitle="New Card"
      updateTitle="Edit Card"
      deleteMessage="Delete Card"
      empty={CardService.EMPTY}
      all={cards}
    >
      <ScrollView>
        <CardSides
          cardHeight={cardHeight}
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
          addTags={addTags}
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
      </ScrollView>
    </CRUDWrapper>
  );
};

export default CardComponent;
