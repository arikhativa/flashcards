import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import TagComponent from "@/components/Tag";
import { CRUDMode } from "@/types/generic";

// TODO maybe make generic

type TagDetailParams = {
  id: string;
  mode: CRUDMode;
};

export const NEW_TAG_ID = "new";

const TagPage: React.FC = () => {
  const { id, mode } = useLocalSearchParams<TagDetailParams>();

  useEffect(() => {
    if (!id) {
      console.error("Bad Card ID");
      return;
    }
  }, []);

  const getComponent = () => {
    if (id === NEW_TAG_ID) {
      return <TagComponent mode={CRUDMode.Create} />;
    }
    if (mode && mode === CRUDMode.Read) {
      return <TagComponent mode={CRUDMode.Read} id={id} />;
    }
    return <TagComponent mode={CRUDMode.Update} id={id} />;
  };

  return getComponent();
};

export default TagPage;
