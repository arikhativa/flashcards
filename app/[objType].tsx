import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import TagComponent from "@/components/tag/Tag";
import { ComponentProps, CRUDMode, ObjType } from "@/types/generic";
import CardComponent from "@/components/card/Card";
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

  const getGenericComponent = <T,>(component: React.FC<ComponentProps<T>>) => {
    if (id === NEW_ID) {
      return React.createElement(component, {
        mode: CRUDMode.Create,
      });
    }
    if (mode && mode === CRUDMode.Read) {
      return React.createElement(component, {
        mode: CRUDMode.Read,
        id: id,
      });
    }
    return React.createElement(component, {
      mode: CRUDMode.Update,
      id: id,
    });
  };

  const getComponent = () => {
    if (objType === ObjType.Tag) {
      return getGenericComponent(TagComponent);
    } else if (objType === ObjType.Card) {
      return getGenericComponent(CardComponent);
    }
    return <NotFoundScreen />;
  };

  return getComponent();
};

export default ObjPage;
