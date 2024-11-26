import { Dimensions, ScrollView } from "react-native";
import { Card, CardCreate, CardUpdate } from "@/types/Card";
import { margin } from "@/constants/styles";
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
import CardComment from "./CardComment";

type CardComponentProps = ComponentProps<Card>;

const CardComponent = ({ mode, data, id }: CardComponentProps) => {
  const { cards, cardService } = useStore();

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

  const setTags = (list: Tag[]) => {
    let newList: Tag[] = [];

    list.forEach((e) => {
      newList.push(e);
    });
    setCardLocal({ ...cardLocal, tags: newList });
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

        <CardComment
          disabled={isDisable()}
          style={[margin.base2]}
          onChangeText={(text) => {
            handleLocalChange("comment", text);
          }}
          value={cardLocal.comment}
        />

        <TagsSection
          style={[margin.base2]}
          disabled={isDisable()}
          setTags={setTags}
          removeTag={removeTag}
          tags={cardLocal.tags}
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
