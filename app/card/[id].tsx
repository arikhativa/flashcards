import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import CardComponent from "@/components/Card";
import { CRUDMode } from "@/types/generic";

type CardDetailParams = {
  id: string;
  mode: CRUDMode;
};

export const NEW_CARD_ID = "new";

const CardPage: React.FC = () => {
  const { id, mode } = useLocalSearchParams<CardDetailParams>();

  const [idNumber, setIdNumber] = useState<number | undefined>();

  useEffect(() => {
    if (!id) {
      console.error("Bad Card ID");
      return;
    }

    if (id !== NEW_CARD_ID) {
      const localId = parseInt(id, 10);
      setIdNumber(localId);
    }
  }, [id]);

  const getComponent = () => {
    if (id === NEW_CARD_ID) {
      return <CardComponent mode={CRUDMode.Create} />;
    }
    if (mode && mode === CRUDMode.Read) {
      return <CardComponent mode={CRUDMode.Read} id={idNumber} />;
    }
    return <CardComponent mode={CRUDMode.Update} id={idNumber} />;
  };

  return getComponent();
};

export default CardPage;
