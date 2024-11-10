import { baseUnit, gap, margin } from "@/constants/styles";
import { useState, type PropsWithChildren } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Searchbar, IconButton, Chip } from "react-native-paper";
import FilterCards from "./FilterCards";
import { SelectedKL } from "@/types/KnowledgeLevel";
import { FilterChip, Sort, TimeRange } from "@/types/generic";
import SortCards from "./SortCards";

type CardsActionsProps = PropsWithChildren<{
  sort: Sort;
  onSortChange: (sort: Sort) => void;
  filters: FilterChip[];
  range: TimeRange;
  onRangeChange: (range: TimeRange) => void;
  query: string;
  onQueryChange: (text: string) => void;
  selectedKL: SelectedKL;
  onKLChange: (selectedKL: SelectedKL) => void;
}>;

export default function CardsActions({
  sort,
  onSortChange,
  filters,
  range,
  onRangeChange,
  query,
  onQueryChange,
  selectedKL,
  onKLChange,
}: CardsActionsProps) {
  return (
    <View style={[margin.x2, margin.top3, margin.bottom2]}>
      <View style={[margin.bottom2, gap.base, { flexDirection: "row" }]}>
        <Searchbar
          placeholder="Search"
          onChangeText={onQueryChange}
          value={query}
          style={{ flex: 1 }}
        />
        <SortCards sort={sort} onSortChange={onSortChange} />
        <FilterCards
          range={range}
          onRangeChange={onRangeChange}
          selectedKL={selectedKL}
          onKLChange={onKLChange}
        />
      </View>
      <View>
        <FlatList
          data={filters}
          horizontal
          keyExtractor={(_filters, index) => index.toString()}
          renderItem={({ item }) => (
            <Chip
              closeIcon={"close"}
              onClose={item.onClose}
              style={{
                marginLeft: baseUnit,
                alignSelf: "flex-start",
              }}
            >
              {item.name}
            </Chip>
          )}
        />
      </View>
    </View>
  );
}
