import { View } from "react-native";
import { FAB } from "react-native-paper";
import { useStore } from "@/providers/GlobalStore";
import { Link } from "expo-router";
import { margin } from "@/constants/styles";
import { container } from "../../constants/styles";
import { getCardHref } from "@/utils/links";
import { NEW_ID } from "../[objType]";
import { CardManyTiles } from "@/components/CardManyTiles";
import { useEffect, useState } from "react";
import { FULL_SELECTED_KL, SelectedKL } from "@/types/KnowledgeLevel";
import { Card } from "@/types/Card";
import {
  FilterChip,
  FilterNames,
  Sort,
  SortNames,
  TimeRange,
} from "@/types/generic";
import CardsActions from "@/components/CardsActions";
import { isKnowledgeLevelFullOn } from "@/utils/knowledgeLevel";
import { defaultSort } from "@/utils/generic";
import { sorByAlpha, sortByDate, sortByKL } from "@/utils/sort";
import CardsMultiSelectActions from "@/components/CardsMultiSelectActions";

export default function CardsScreen() {
  const { cards, archiveCards } = useStore();
  const [cardsLocal, setCardsLocal] = useState(cards);
  const [query, setQuery] = useState("");
  const [range, setRange] = useState<TimeRange>({});
  const [filters, setFilters] = useState<FilterChip[]>([]);
  const [sort, setSort] = useState<Sort>(defaultSort);
  const [isMultiSelect, setIsMultiSelect] = useState(false);
  const [selectedTiles, setSelectedTiles] = useState<number[]>([]);
  const [selectedKL, setSelectedKL] = useState<SelectedKL>(FULL_SELECTED_KL);
  const [archive, setArchive] = useState(false);

  useEffect(() => {
    setIsMultiSelect(!selectedTiles.length ? false : true);
  }, [selectedTiles]);

  useEffect(() => {
    const removeFilterIfNeeded = () => {
      removeArchiveIfNeeded();
      removeRangeIfNeeded();
      removeKLIfNeeded();
    };

    const removeRangeIfNeeded = () => {
      if (!range.endDate || !range.startDate) {
        removeFilter(FilterNames.TimeRange);
      }
    };

    const removeKLIfNeeded = () => {
      if (isKnowledgeLevelFullOn(selectedKL)) {
        removeFilter(FilterNames.KL);
      }
    };

    const removeArchiveIfNeeded = () => {
      if (!archive) {
        removeFilter(FilterNames.ARCHIVE);
      }
    };

    const removeFilter = (name: FilterNames) => {
      if (filters.find((filter) => filter.name === name)) {
        setFilters([...filters.filter((filter) => filter.name !== name)]);
      }
    };

    removeFilterIfNeeded();
  }, [filters, range, selectedKL, archive]);

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

  const handleArchiveChange = () => {
    setArchive(true);

    handleGenericFilterSet(FilterNames.ARCHIVE, () => setArchive(false));
  };

  const handleKLChange = (kl: SelectedKL) => {
    setSelectedKL(kl);

    handleGenericFilterSet(FilterNames.KL, () =>
      setSelectedKL(FULL_SELECTED_KL)
    );
  };

  const handleRangeChange = (range: TimeRange) => {
    setRange(range);

    handleGenericFilterSet(FilterNames.TimeRange, () => setRange({}));
  };

  useEffect(() => {
    const filterCardsByTimeRanger = (list: Card[]) => {
      const start = range.startDate || 0;
      const end = range.endDate || Date.now();
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

    const addArchiveIfNeeded = (list: Card[]) => {
      if (archive) {
        list = [...list, ...archiveCards];
      } else {
        list = list.filter((c) => !c.deletedAt);
      }
      return list;
    };

    const setCardsLocalWitFilters = (list: Card[]) => {
      list = addArchiveIfNeeded(list);
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
  }, [cards, query, selectedKL, range, sort, archive, archiveCards]);

  return (
    <View style={[container.flex1, margin.top2]}>
      <CardsActions
        onArchiveChange={handleArchiveChange}
        sort={sort}
        onSortChange={setSort}
        filters={filters}
        range={range}
        onRangeChange={handleRangeChange}
        query={query}
        onQueryChange={setQuery}
        selectedKL={selectedKL}
        onKLChange={handleKLChange}
      />

      <CardManyTiles
        selectedTiles={selectedTiles}
        setSelectedTiles={setSelectedTiles}
        isMultiSelect={isMultiSelect}
        cards={cardsLocal}
      />
      {!isMultiSelect ? (
        <Link
          style={container.buttonBottomRight}
          href={getCardHref(NEW_ID)}
          asChild
        >
          <FAB icon="plus" />
        </Link>
      ) : (
        <CardsMultiSelectActions
          selectedCards={selectedTiles}
          onDeselectAll={() => setSelectedTiles([])}
        />
      )}
    </View>
  );
}
