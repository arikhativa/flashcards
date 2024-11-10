import { baseUnit, gap, margin } from "@/constants/styles";
import { useState, type PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { Searchbar, IconButton } from "react-native-paper";
import FilterCards from "./FilterCards";
import { SelectedKL } from "@/types/KnowledgeLevel";
import { TimeRange } from "@/types/generic";

type CardsActionsProps = PropsWithChildren<{
  range: TimeRange;
  onRangeChange: (range: TimeRange) => void;
  query: string;
  onQueryChange: (text: string) => void;
  selectedKL: SelectedKL;
  onKLChange: (selectedKL: SelectedKL) => void;
}>;

export default function CardsActions({
  range,
  onRangeChange,
  query,
  onQueryChange,
  selectedKL,
  onKLChange,
}: CardsActionsProps) {
  return (
    <View
      style={[
        margin.x2,
        margin.top3,
        margin.bottom2,
        gap.base,
        { flexDirection: "row" },
      ]}
    >
      <Searchbar
        placeholder="Search"
        onChangeText={onQueryChange}
        value={query}
        style={{ flex: 1 }}
      />
      <IconButton
        mode="contained"
        size={baseUnit * 3}
        icon="sort"
        // onPress={}
      />
      <FilterCards
        range={range}
        onRangeChange={onRangeChange}
        selectedKL={selectedKL}
        onKLChange={onKLChange}
      />
    </View>
  );
}
