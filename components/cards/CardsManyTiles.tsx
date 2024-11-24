import { Card } from "@/types/Card";
import { View, FlatList, Dimensions } from "react-native";
import { Text } from "react-native-paper";
import { CardTile } from "./CardTile";
import { text } from "@/constants/styles";
import { useEffect, useState } from "react";
import { GestureWrapper } from "../shared/GestureWrapper";

const maxSize = Dimensions.get("window").width;
const minCardSize = 51.8;
const averageCharWidth = 7.5;
const gap = 10;

export type CardManyTilesProps = {
  isMultiSelect: boolean;
  selectedIds: number[];
  toggleIdSelection: (id: number) => void;
  clearSelectedIds: () => void;
  cards?: Card[];
  disabledLink?: boolean;
};

export function CardsManyTiles({
  isMultiSelect,
  selectedIds,
  toggleIdSelection,
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
    <GestureWrapper onTap={clearSelectedIds} enabled={isMultiSelect}>
      <View style={{ flex: 1 }}>
        {!rows || rows.length === 0 ? (
          // TODO this needs to be responsive
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={text.grayMessage}>No cards</Text>
          </View>
        ) : (
          <FlatList
            data={rows}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={{
              justifyContent: "center",
              alignItems: "center",
            }}
            renderItem={renderRow}
          />
        )}
      </View>
    </GestureWrapper>
  );
}

function getCardSize(c: Card) {
  return (
    minCardSize + Math.max(c.sideA.length + c.sideB.length) * averageCharWidth
  );
}

function getRowSize(row: Card[]) {
  let size = 0;
  row.forEach((c) => {
    size += getCardSize(c) + gap;
  });
  return size;
}
