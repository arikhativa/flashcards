import { CRUDMode } from "@/types/generic";
import { Href } from "expo-router";

interface CardLinkProps {
  params: {
    id: string;
    mode: CRUDMode;
  };
}

export function getCardHref(id: string | number): Href<CardLinkProps> {
  return {
    pathname: "/card/[id]",
    params: { id: id },
  };
}
