import React from "react";
import { StyleSheet, View } from "react-native";
import { Dialog, IconButton, Portal, Text } from "react-native-paper";
import { CardTile } from "../cards/CardTile";
import { Card } from "@/types/Card";
import Autocomplete from "../shared/Autocomplete";
import { baseUnit, container, margin, padding } from "@/constants/styles";
import { CardsManyTiles } from "../cards/CardsManyTiles";

interface CardsSectionProps {
  allCards: Card[];
  cards?: Card[];
  addCard: (card: Card) => void;
  isMultiSelect: boolean;
  selectedIds: number[];
  toggleIdSelection: (id: number) => void;
  clearSelectedIds: () => void;
}

const CardsSection = ({
  cards,
  allCards,
  addCard,
  isMultiSelect,
  selectedIds,
  clearSelectedIds,
  toggleIdSelection,
}: CardsSectionProps) => {
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const keyExtractor = (card: Card): string => card.id.toString();

  const onSelect = (card: Card) => {
    addCard(card);
  };

  const onSearchChange = (query: string): Card[] => {
    if (!query) {
      return [];
    }

    return allCards
      .filter(
        (card) =>
          card.sideA.toLowerCase().includes(query.toLowerCase()) ||
          card.sideB.toLowerCase().includes(query.toLowerCase())
      )
      .filter((card) => !cards?.find((e) => e.id === card.id));
  };

  return (
    <View style={[{ flex: 1 }]}>
      <View
        style={[
          margin.base2,
          {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          },
          padding.bottom,
        ]}
      >
        <Text style={padding.bottom} variant="titleMedium">
          Cards
        </Text>
        <IconButton
          icon="plus"
          size={baseUnit * 2}
          mode="contained-tonal"
          onPress={showDialog}
        ></IconButton>
      </View>

      <CardsManyTiles
        clearSelectedIds={clearSelectedIds}
        isMultiSelect={isMultiSelect}
        selectedIds={selectedIds}
        toggleIdSelection={toggleIdSelection}
        disabledLink
        cards={cards}
      />

      <Portal>
        {visible && (
          <View style={styles.viewContainer}>
            <Dialog
              style={[styles.dialogContainer]}
              visible={visible}
              onDismiss={hideDialog}
            >
              <Dialog.Title>Search for Cards</Dialog.Title>
              <IconButton
                style={container.buttonTopRight}
                icon="close"
                size={baseUnit * 2}
                onPress={hideDialog}
              ></IconButton>
              <Dialog.Content>
                <Autocomplete
                  icon={"cards-outline"}
                  placeholder="Search"
                  onSelect={onSelect}
                  keyExtractor={keyExtractor}
                  onSearchChange={onSearchChange}
                  itemComponent={({ item }) => (
                    <CardTile disabledLink card={item}></CardTile>
                  )}
                />
              </Dialog.Content>
            </Dialog>
          </View>
        )}
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
  dialogContainer: {
    position: "absolute",
    backgroundColor: "white", // TODO bad color use the one in stye or them
    width: "90%",
    top: 0,
    alignSelf: "center",
  },
});

export default CardsSection;
