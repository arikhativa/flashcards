import { Card } from "@/types/Card";
import { View, Dimensions } from "react-native";
import { CardTile } from "./CardTile";
import { useEffect, useState } from "react";
import { ObjType } from "@/types/generic";
import { ObjLinkProps, TestLinkProps } from "@/utils/links";
import { Href } from "expo-router";
import { ManyTiles } from "../shared/ManyTiles";

const minCardSize = 51.8;
const averageCharWidth = 7.5;
const gap = 20;

export type CardManyTilesProps = {
  isRootless?: boolean;
  onSelectMany?: () => void;
  isMultiSelect: boolean;
  selectedIds: number[];
  toggleIdSelection: (id: number) => void;
  clearSelectedIds: () => void;
  onTagMany?: () => void;
  onDeleteMany?: () => void;
  onTestMany?: (type?: ObjType) => void;
  cards?: Card[];
  disabledLink?: boolean;
  href?: Href<ObjLinkProps | TestLinkProps>;
};

export function CardsManyTiles({
  isRootless,
  onSelectMany,
  href,
  isMultiSelect,
  selectedIds,
  toggleIdSelection,
  onDeleteMany,
  onTagMany,
  onTestMany,
  clearSelectedIds,
  cards,
  disabledLink,
}: CardManyTilesProps) {
  const maxSize = isRootless
    ? Dimensions.get("window").width * 0.9
    : Dimensions.get("window").width;

  const [rows, setRows] = useState<Card[][]>([]);

  useEffect(() => {
    convertCardsToRows(cards || []);
  }, [cards, maxSize]);

  const convertCardsToRows = (cards: Card[]) => {
    const newRows: Card[][] = [];
    let tmpRow: Card[] = [];

    cards.forEach((card, index) => {
      const newCardSize = getCardSize(card);
      const rowSize = getRowSize(tmpRow);
      if (rowSize + newCardSize > maxSize || tmpRow.length === 4) {
        newRows.push(tmpRow);
        tmpRow = [];
      }
      tmpRow.push(card);
    });

    if (tmpRow.length) {
      newRows.push(tmpRow);
    }
    setRows(newRows);
  };

  const handleLongPress = (id: number) => {
    toggleIdSelection(id);
  };

  const handlePress = (id: number) => {
    if (isMultiSelect) {
      toggleIdSelection(id);
    }
    if (isRootless) {
      toggleIdSelection(id);
    }
  };

  const renderRow = ({ item }: { item: Card[] }) => {
    const children = item.map((card) => {
      return (
        <CardTile
          key={card.id}
          disabledLink={isRootless || isMultiSelect ? true : disabledLink}
          card={card}
          onLongPress={handleLongPress}
          onPress={handlePress}
          isSelected={selectedIds.includes(card.id)}
        />
      );
    });

    return (
      <View
        style={{
          flexDirection: "row",
        }}
      >
        {children}
      </View>
    );
  };

  return (
    <ManyTiles
      isRootless={isRootless}
      onSelectMany={onSelectMany}
      isMultiSelect={isMultiSelect}
      selectedIds={selectedIds}
      clearSelectedIds={clearSelectedIds}
      onTagMany={onTagMany}
      onDeleteMany={onDeleteMany}
      onTestMany={onTestMany}
      objs={rows}
      renderItem={renderRow}
      noObjsMessage="No cards"
      contentContainerStyle={{
        justifyContent: "center",
        alignItems: "center",
      }}
      href={href}
      type={ObjType.Card}
    />
  );
}

function getCardSize(c: Card) {
  return (
    minCardSize + Math.max(c.sideA.length, c.sideB.length) * averageCharWidth
  );
}

function getRowSize(row: Card[]) {
  let size = 0;
  row.forEach((c, index) => {
    if (index !== 0) {
      size += gap;
    }
    size += getCardSize(c);
  });
  return size;
}
