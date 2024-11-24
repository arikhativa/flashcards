import { baseUnit, gap, margin } from "@/constants/styles";
import { FilterChip } from "@/types/generic";
import { SelectedKL } from "@/types/KnowledgeLevel";
import { FlatList, View } from "react-native";
import { Chip, Searchbar, Surface } from "react-native-paper";
import SortCards from "../cards/SortCards";
import FilterCards from "../cards/FilterCards";
import { Sort } from "@/types/Sort";
import { TimeDropdown } from "@/hooks/useTimeDropdown";

interface ListActionsProps {
  filters?: FilterChip[];
  query?: string;
  onQueryChange?: (text: string) => void;
  sort?: Sort;
  onSortChange?: (sort: Sort) => void;
  selectedKL?: SelectedKL;
  onKLChange?: (selectedKL: SelectedKL) => void;
  timeDropdown?: TimeDropdown;
}

export default function ListActions({
  sort,
  onSortChange,
  filters,
  timeDropdown,
  query,
  onQueryChange,
  selectedKL,
  onKLChange,
}: ListActionsProps) {
  return (
    <Surface mode="flat" elevation={1}>
      <View style={[margin.x2, margin.top3, margin.bottom2]}>
        <View style={[margin.bottom2, gap.base, { flexDirection: "row" }]}>
          {query !== undefined && onQueryChange && (
            <Searchbar
              placeholder="Search"
              onChangeText={onQueryChange}
              value={query}
              style={{ flex: 1 }}
            />
          )}
          {sort && onSortChange && (
            <SortCards sort={sort} onSortChange={onSortChange} />
          )}
          <FilterCards
            hide
            timeDropdown={timeDropdown}
            selectedKL={selectedKL}
            onKLChange={onKLChange}
          />
        </View>
        <View>
          <FlatList
            contentContainerStyle={{
              justifyContent: "center",
              alignItems: "center",
            }}
            style={{
              height: 40,
            }}
            data={filters}
            horizontal
            keyExtractor={(_filters, index) => index.toString()}
            renderItem={({ item }) => (
              <Chip
                closeIcon={"close"}
                onClose={item.onClose}
                style={{
                  marginLeft: baseUnit,
                }}
              >
                {item.name}
              </Chip>
            )}
          />
        </View>
      </View>
    </Surface>
  );
}
