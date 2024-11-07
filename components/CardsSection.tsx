import React, { useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Dialog, IconButton, Portal, Text } from "react-native-paper";
import { Card as PaperCard } from "react-native-paper";
import { CardTile } from "./CardTile";
import { Card } from "@/types/Card";
import Autocomplete from "./Autocomplete";
import { baseUnit, container, margin, padding, text } from "@/constants/styles";
import { useStore } from "@/providers/GlobalStore";
import { CardManyTiles } from "./CardManyTiles";

interface CardsSectionProps {
  allCards: Card[];
  cards?: Card[];
  addCard: (card: Card) => void;
  removeCard: (card: Card) => void;
}

const CardsSection = ({
  cards,
  allCards,
  addCard,
  removeCard,
}: CardsSectionProps) => {
  const { cardService } = useStore();
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
    <View style={[margin.base2]}>
      <View style={[container.flexXSpace, padding.bottom]}>
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

      <CardManyTiles disabledLink onClose={removeCard} cards={cards} />

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
