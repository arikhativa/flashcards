import { CRUDMode, ObjType } from "@/types/generic";
import { Href } from "expo-router";

export interface ObjLinkProps {
  params: {
    objType: ObjType;
    id: string;
    mode: CRUDMode;
  };
}

export interface TestLinkProps {
  params: {};
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

export function getTestHref(): Href<TestLinkProps> {
  return {
    pathname: "/TestPage",
    // params: { objType: ObjType.Tag, id: id, mode: mode },
  };
}

export function getHomeHref(): Href {
  return {
    pathname: "/",
  };
}
