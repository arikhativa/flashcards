import { CardCreate, CardUpdate } from "@/types/Card";
import { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useStore } from "@/providers/GlobalStore";
import { KnowledgeLevel } from "@/types/KnowledgeLevel";
import CardComponent from "@/components/Card";

type CardDetailParams = {
  id: string;
};

export const NEW_CARD_ID = "new";

const CardPage: React.FC = () => {
  const { cards, cardService } = useStore();
  const { id } = useLocalSearchParams<CardDetailParams>();
  const navigation = useNavigation();

  const [idNumber, setIdNumber] = useState<number>(-1);
  const [cardCreate, setCardCreate] = useState<CardCreate>({} as CardCreate);
  const [cardUpdate, setCardUpdate] = useState<CardUpdate>({} as CardUpdate);

  useEffect(() => {
    if (!id) {
      console.error("Bad Card ID");
      return;
    }

    if (id === NEW_CARD_ID) {
      navigation.setOptions({ title: "New Card" });
      setCardCreate({
        sideA: "",
        sideB: "",
        comment: "",
        knowledgeLevel: KnowledgeLevel.Learning,
      });
    } else {
      navigation.setOptions({ title: `Edit Card ${id}` });

      const localId = parseInt(id, 10);
      setIdNumber(localId);

      const card = cards.find((card) => card.id === localId);

      if (!card) {
        console.error("Card not found");
        return;
      }
      setCardUpdate(card);
    }
  }, [id]); //TODO can be problematic

  const handleSubmitCreate = async (card: CardCreate | CardUpdate) => {
    await cardService.create(card);
    navigation.goBack();
  };

  const handleSubmitUpdate = async (card: CardCreate | CardUpdate) => {
    await cardService.update(idNumber, card as CardUpdate);
    navigation.goBack();
  };

  const handleDelete = async () => {
    await cardService.delete(idNumber);
    navigation.goBack();
  };

  const getComponent = () => {
    if (id === NEW_CARD_ID) {
      return (
        <CardComponent card={cardCreate} handleSubmit={handleSubmitCreate} />
      );
    }
    return (
      <CardComponent
        card={cardUpdate}
        handleSubmit={handleSubmitUpdate}
        handleDelete={handleDelete}
      />
    );
  };

  return getComponent();
};

export default CardPage;
