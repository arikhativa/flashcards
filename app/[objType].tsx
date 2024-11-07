import { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import TagComponent from "@/components/Tag";
import { CRUDMode, ObjType } from "@/types/generic";
import CardComponent from "@/components/Card";
import NotFoundScreen from "./+not-found";

type localSearchParams = {
  objType: ObjType;
  id: string;
  mode: CRUDMode;
};

export const NEW_ID = "new";

const ObjPage: React.FC = () => {
  const { id, mode, objType } = useLocalSearchParams<localSearchParams>();
  useEffect(() => {
    if (!id) {
      console.error("Bad Card ID");
      return;
    }
  }, []);

  const getTagComponent = () => {
    if (id === NEW_ID) {
      return <TagComponent mode={CRUDMode.Create} />;
    }
    if (mode && mode === CRUDMode.Read) {
      return <TagComponent mode={CRUDMode.Read} id={id} />;
    }
    return <TagComponent mode={CRUDMode.Update} id={id} />;
  };

  const getCardComponent = () => {
    if (id === NEW_ID) {
      return <CardComponent mode={CRUDMode.Create} />;
    }
    if (mode && mode === CRUDMode.Read) {
      return <CardComponent mode={CRUDMode.Read} id={id} />;
    }
    return <CardComponent mode={CRUDMode.Update} id={id} />;
  };

  const getComponent = () => {
    if (objType === ObjType.Tag) {
      return getTagComponent();
    } else if (objType === ObjType.Card) {
      return getCardComponent();
    }
    return <NotFoundScreen />;
  };

  return getComponent();
};

export default ObjPage;
