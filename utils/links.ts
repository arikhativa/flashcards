import { CRUDMode, ObjType } from "@/types/generic";
import { Href, RouteParamInput } from "expo-router";
import { toStringIds } from "./generic";

export type ObjLinkProps = {
  params: {
    objType: ObjType;
    id: string;
    mode: CRUDMode;
  };
};

export type TestLinkProps = {
  rawIds: string;
  type: ObjType;
};

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

export function getHomeHref(): Href {
  return {
    pathname: "/",
  };
}
