import { View } from "react-native";
import { useStore } from "@/providers/GlobalStore";
import { margin } from "@/constants/styles";
import { container } from "../../constants/styles";
import { getCardHref } from "@/utils/links";
import { useEffect, useState } from "react";
import { FULL_SELECTED_KL, SelectedKL } from "@/types/KnowledgeLevel";
import { Card } from "@/types/Card";
import { FilterChip, FilterNames, ObjType, TimeRange } from "@/types/generic";
import { isKnowledgeLevelFullOn } from "@/utils/knowledgeLevel";
import {
  getSortDirectionByName,
  sorByAlpha,
  sortByDate,
  sortByKL,
} from "@/utils/sort";
import { useMultiSelect } from "@/hooks/useMultiSelect";
import { NEW_ID } from "../[objType]";
import MultiSelectActionBar from "@/components/shared/MultiSelectActionBar";
import ListActions from "@/components/shared/ListActions";
import { CardsManyTiles } from "@/components/cards/CardsManyTiles";
import { Sort, SortNames } from "@/types/Sort";
import { useTimeDropdown } from "@/hooks/useTimeDropdown";
import { OPTIONS_VALUES } from "@/utils/testForm";

export default function CardsScreen() {
  const { cards, cardService, conf } = useStore();
  const [cardsLocal, setCardsLocal] = useState(cards);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<FilterChip[]>([]);

  const timeDropdown = useTimeDropdown(OPTIONS_VALUES.Anytime);

  const [sort, setSort] = useState<Sort>({
    field: conf.sortBy,
    direction: getSortDirectionByName(conf.sortBy),
  });

  const {
    isMultiSelect,
    selectedIds,
    selectedIdsRef,
    toggleIdSelection,
    clearSelectedIds,
    handelTestMany,
  } = useMultiSelect();
  const [selectedKL, setSelectedKL] = useState<SelectedKL>(FULL_SELECTED_KL);

  useEffect(() => {
    const removeFilterIfNeeded = () => {
      removeRangeIfNeeded();
      removeKLIfNeeded();
    };

    const removeRangeIfNeeded = () => {
      if (!timeDropdown.range.endDate || !timeDropdown.range.startDate) {
        removeFilter(FilterNames.TimeRange);
      }
    };

    const removeKLIfNeeded = () => {
      if (isKnowledgeLevelFullOn(selectedKL)) {
        removeFilter(FilterNames.KL);
      }
    };

    const removeFilter = (name: FilterNames) => {
      if (filters.find((filter) => filter.name === name)) {
        setFilters([...filters.filter((filter) => filter.name !== name)]);
      }
    };

    removeFilterIfNeeded();
  }, [filters, timeDropdown.range, selectedKL]);

  useEffect(() => {
    if (!conf) {
      return;
    }

    setSort({
      field: conf.sortBy,
      direction: getSortDirectionByName(conf.sortBy),
    });
  }, [conf]);

  const handleGenericFilterSet = (name: FilterNames, onClose: () => void) => {
    if (filters.find((filter) => filter.name === name)) {
      return;
    }

    const f: FilterChip = {
      name,
      onClose: onClose,
    };
    setFilters([...filters, f]);
  };

  const handleKLChange = (kl: SelectedKL) => {
    setSelectedKL(kl);

    handleGenericFilterSet(FilterNames.KL, () =>
      setSelectedKL(FULL_SELECTED_KL)
    );
  };

  useEffect(() => {
    const filterCardsByTimeRanger = (list: Card[]) => {
      const start = timeDropdown.range.startDate || 0;
      const end = timeDropdown.range.endDate || Date.now();
      return list.filter(
        (card) => card.createdAt >= start && card.createdAt <= end
      );
    };

    const filterCardsByKL = (list: Card[]) => {
      return list.filter((card) => selectedKL[card.knowledgeLevel]);
    };

    const filterCardsBySearch = (list: Card[]) => {
      if (!query || query === "") {
        return list;
      }

      return list.filter(
        (card) =>
          card.sideA.toLowerCase().includes(query.toLowerCase()) ||
          card.sideB.toLowerCase().includes(query.toLowerCase())
      );
    };

    const setCardsLocalWitFilters = (list: Card[]) => {
      list = filterCardsByTimeRanger(list);
      list = filterCardsByKL(list);
      list = filterCardsBySearch(list);
      return list;
    };

    const setCardsLocalSort = (list: Card[]) => {
      if (sort.field === SortNames.TIME) {
        return sortByDate(list, sort.direction);
      }
      if (sort.field === SortNames.KL) {
        return sortByKL(list, sort.direction);
      }
      if (sort.field === SortNames.SIDE_A_ABC) {
        return sorByAlpha(list, "sideA", sort.direction);
      }
      if (sort.field === SortNames.SIDE_B_ABC) {
        return sorByAlpha(list, "sideB", sort.direction);
      }
      return list;
    };

    setCardsLocal(setCardsLocalSort(setCardsLocalWitFilters(cards)));
  }, [cards, query, selectedKL, timeDropdown.range, sort]);

  const handelDeleteMany = async () => {
    const ret = await cardService.deleteMany(selectedIdsRef.current);
    clearSelectedIds();
  };

  return (
    <View style={[container.flex1, margin.top2]}>
      <ListActions
        sort={sort}
        onSortChange={setSort}
        filters={filters}
        timeDropdown={timeDropdown}
        query={query}
        onQueryChange={setQuery}
        selectedKL={selectedKL}
        onKLChange={handleKLChange}
      />

      <CardsManyTiles
        selectedIds={selectedIds}
        clearSelectedIds={clearSelectedIds}
        toggleIdSelection={toggleIdSelection}
        isMultiSelect={isMultiSelect}
        cards={cardsLocal}
      />
      <MultiSelectActionBar
        type={ObjType.Card}
        isMultiSelect={isMultiSelect}
        selectedIds={selectedIds}
        onDeleteMany={handelDeleteMany}
        href={getCardHref(NEW_ID)}
        onTestMany={handelTestMany}
      />
    </View>
  );
}
