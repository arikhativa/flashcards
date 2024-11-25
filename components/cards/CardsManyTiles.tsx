import { Card } from "@/types/Card";
import { View, Dimensions } from "react-native";
import { CardTile } from "./CardTile";
import { useEffect, useState } from "react";
import { ObjType } from "@/types/generic";
import { ObjLinkProps, TestLinkProps } from "@/utils/links";
import { Href } from "expo-router";
import { ManyTiles } from "../shared/ManyTiles";

const maxSize = Dimensions.get("window").width;
const minCardSize = 51.8;
const averageCharWidth = 7.5;
const gap = 20;

export type CardManyTilesProps = {
  isMultiSelect: boolean;
  selectedIds: number[];
  toggleIdSelection: (id: number) => void;
  clearSelectedIds: () => void;
  onUnTagMany?: () => void;
  onDeleteMany?: () => void;
  onTestMany?: (type?: ObjType) => void;
  cards?: Card[];
  disabledLink?: boolean;
  href?: Href<ObjLinkProps | TestLinkProps>;
};

export function CardsManyTiles({
  href,
  isMultiSelect,
  selectedIds,
  toggleIdSelection,
  onDeleteMany,
  onUnTagMany,
  onTestMany,
  clearSelectedIds,
  cards,
  disabledLink,
}: CardManyTilesProps) {
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
  };

  const renderRow = ({ item }: { item: Card[] }) => {
    const children = item.map((card) => {
      return (
        <CardTile
          key={card.id}
          disabledLink={isMultiSelect ? true : disabledLink}
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
      isMultiSelect={isMultiSelect}
      selectedIds={selectedIds}
      clearSelectedIds={clearSelectedIds}
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
