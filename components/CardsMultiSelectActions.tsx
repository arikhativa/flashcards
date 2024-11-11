import { baseUnit, container, gap, margin } from "@/constants/styles";
import { useState, type PropsWithChildren } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Searchbar, IconButton, Chip, Text, FAB } from "react-native-paper";
import FilterCards from "./FilterCards";
import { SelectedKL } from "@/types/KnowledgeLevel";
import { FilterChip, Sort, TimeRange } from "@/types/generic";
import SortCards from "./SortCards";
import { Card } from "@/types/Card";

type CardsMultiSelectActionsProps = PropsWithChildren<{
  selectedCards: number[];
  onDeselectAll: () => void;
}>;

export default function CardsMultiSelectActions({
  selectedCards,
  onDeselectAll,
}: CardsMultiSelectActionsProps) {
  return (
    <View
      style={[
        margin.base2,
        container.bottom,
        { flexDirection: "row", gap: 20 },
      ]}
    >
      <FAB icon="trash-can-outline" />
      <FAB icon="archive-outline" />
      <FAB icon="arrow-left" onPress={onDeselectAll} />
      <FAB icon="test-tube" />
    </View>
  );
}
