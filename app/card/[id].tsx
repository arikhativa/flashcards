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

  useEffect(() => {
    if (!id) {
      console.error("Bad Card ID");
      return;
    }
  }, []);

  const getComponent = () => {
    if (id === NEW_CARD_ID) {
      return <CardComponent mode={CRUDMode.Create} />;
    }
    if (mode && mode === CRUDMode.Read) {
      return <CardComponent mode={CRUDMode.Read} id={id} />;
    }
    return <CardComponent mode={CRUDMode.Update} id={id} />;
  };

  return getComponent();
};

export default CardPage;
