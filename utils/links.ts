import { CRUDMode, ObjType } from "@/types/generic";
import { Href } from "expo-router";

interface ObjLinkProps {
  params: {
    objType: ObjType;
    id: string;
    mode: CRUDMode;
  };
}

export function getCardHref(
  id: string | number,
  mode?: CRUDMode
): Href<ObjLinkProps> {
  return {
    pathname: "/[objType]",
    params: { objType: ObjType.Card, id: id, mode: mode },
  };
}

export function getTagHref(
  id: string | number,
  mode?: CRUDMode
): Href<ObjLinkProps> {
  return {
    pathname: "/[objType]",
    params: { objType: ObjType.Tag, id: id, mode: mode },
  };
}
