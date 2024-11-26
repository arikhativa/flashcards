import { CRUDMode, ObjType } from "@/types/generic";
import { Href, RouteParamInput, Routes } from "expo-router";
import { toStringIds } from "./generic";

export type ObjLinkProps = Routes & {
  objType: ObjType;
  id: string;
  mode: CRUDMode;
  rawIds?: string;
};

export type TestLinkProps = {
  rawIds: string;
  type: ObjType;
};

export type BrowseLinkProps = {
  rawIds: string;
};

export function getCardHref(
  id: string | number,
  mode?: CRUDMode
): Href<ObjLinkProps> {
  return {
    pathname: "/[objType]",
    params: { objType: ObjType.Card, id, mode },
  };
}

export function getTagHref(
  id: string | number,
  mode?: CRUDMode,
  cardIds?: number[]
): Href<ObjLinkProps> {
  return {
    pathname: "/[objType]",
    params: {
      objType: ObjType.Tag,
      id,
      mode,
      rawIds: cardIds ? toStringIds(cardIds) : "",
    },
  };
}

export function getTestHref(
  selectedIds?: number[],
  type: ObjType = ObjType.Card
): Href<RouteParamInput<TestLinkProps>> {
  const prop: RouteParamInput<TestLinkProps> = {
    rawIds: (selectedIds ? toStringIds(selectedIds) : []) as unknown as string,
    type,
  };

  return {
    pathname: "/TestPage",
    params: prop,
  };
}

export function getBrowseHref(
  selectedIds?: number[]
): Href<RouteParamInput<BrowseLinkProps>> {
  const prop: RouteParamInput<TestLinkProps> = {
    rawIds: (selectedIds ? toStringIds(selectedIds) : []) as unknown as string,
  };

  return {
    pathname: "/BrowsePage",
    params: prop,
  };
}

export function getHomeHref(): Href {
  return {
    pathname: "/",
  };
}
