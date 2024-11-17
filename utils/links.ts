import { CRUDMode, ObjType } from "@/types/generic";
import { Href } from "expo-router";
import { toStringIds } from "./generic";

export interface ObjLinkProps {
  params: {
    objType: ObjType;
    id: string;
    mode: CRUDMode;
  };
}

export interface TestLinkProps {
  params: {
    rawIds: string | string[];
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

export function getTestHref(selectedIds?: number[]): Href<TestLinkProps> {
  const prop: TestLinkProps = {
    params: {
      rawIds: selectedIds ? toStringIds(selectedIds) : [],
    },
  };

  return {
    pathname: "/TestPage",
    params: prop.params,
  };
}

export function getHomeHref(): Href {
  return {
    pathname: "/",
  };
}
