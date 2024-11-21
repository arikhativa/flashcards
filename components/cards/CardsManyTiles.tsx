import { Card } from "@/types/Card";
import { View, FlatList } from "react-native";
import { Text } from "react-native-paper";
import { CardTile } from "./CardTile";
import { baseUnit, text } from "@/constants/styles";
import { useEffect, useState } from "react";
import { NAV_BAR_HEIGHT } from "@/constants/general";

const GAP = 3;
const MAX_ROW_SIZE = 50;

export type CardManyTilesProps = {
  isMultiSelect: boolean;
  selectedIds: number[];
  toggleIdSelection: (id: number) => void;
  cards?: Card[];
  disabledLink?: boolean;
};

export function CardsManyTiles({
  isMultiSelect,
  selectedIds,
  toggleIdSelection,
  cards,
  disabledLink,
}: CardManyTilesProps) {
  const [rows, setRows] = useState<Card[][]>([]);

  useEffect(() => {
    convertCardsToRows(cards || []);
  }, [cards]);

  const convertCardsToRows = (cards: Card[]) => {
    const newRows: Card[][] = [];
    let tmpRow: Card[] = [];

    cards.forEach((card, index) => {
      const cardSize = getCardSize(card);
      const rowSize = getRowSize(tmpRow);

      if (rowSize + cardSize > MAX_ROW_SIZE || tmpRow.length === 4) {
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
    <View>
      {!rows || rows.length === 0 ? (
        // TODO this needs to be responsive
        <View style={[]}>
          <Text style={text.grayMessage}>No cards</Text>
        </View>
      ) : (
        <FlatList
          style={{ marginBottom: NAV_BAR_HEIGHT * 2 + baseUnit }}
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
  );
}

function getCardSize(c: Card) {
  return Math.max(c.sideA.length + c.sideB.length);
}

function getRowSize(row: Card[]) {
  let size = 0;
  row.forEach((c) => {
    size += getCardSize(c) + GAP;
  });
  return size;
}
