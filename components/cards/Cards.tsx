import { View } from "react-native";
import { container } from "../../constants/styles";
import { useEffect, useState } from "react";
import { FULL_SELECTED_KL, SelectedKL } from "@/types/KnowledgeLevel";
import { Card } from "@/types/Card";
import { CRUDMode, FilterChip, FilterNames, NEW_ID } from "@/types/generic";
import { isKnowledgeLevelFullOn } from "@/utils/knowledgeLevel";
import {
  getSortDirectionByName,
  sorByAlpha,
  sortByDate,
  sortByKL,
} from "@/utils/sort";
import { MultiSelect } from "@/hooks/useMultiSelect";
import ListActions from "@/components/shared/ListActions";
import { CardsManyTiles } from "@/components/cards/CardsManyTiles";
import { Sort, SortNames } from "@/types/Sort";
import { useTimeDropdown } from "@/hooks/useTimeDropdown";
import { OPTIONS_VALUES } from "@/utils/testForm";
import ConfirmationDialog from "@/components/shared/ConfirmationDialog";
import { useVisible } from "@/hooks/useVisible";
import { getCardHref, getTagHref } from "@/utils/links";
import { router } from "expo-router";
import { CardService } from "@/services/Card";
import { Conf } from "@/types/Conf";

interface CardsProps {
  isRootless?: boolean;
  conf: Conf;
  cards: Card[];
  cardService: CardService;
  multiSelect: MultiSelect;
  onSelectMany?: () => void;
}

export default function Cards({
  isRootless,
  conf,
  cards,
  cardService,
  onSelectMany,
  multiSelect,
}: CardsProps) {
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
  } = multiSelect;

  const [selectedKL, setSelectedKL] = useState<SelectedKL>(FULL_SELECTED_KL);
  const { visible, toggleVisible } = useVisible();

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

  const handleTagMany = async () => {
    const href = getTagHref(NEW_ID, CRUDMode.Create, selectedIdsRef.current);
    router.push(href);
    clearSelectedIds();
  };

  return (
    <View style={[container.flex1]}>
      <ListActions
        conf={conf}
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
        isRootless={isRootless}
        onSelectMany={onSelectMany}
        onDeleteMany={toggleVisible}
        onTagMany={handleTagMany}
        onTestMany={handelTestMany}
        selectedIds={selectedIds}
        clearSelectedIds={clearSelectedIds}
        toggleIdSelection={toggleIdSelection}
        isMultiSelect={isMultiSelect}
        cards={cardsLocal}
        href={getCardHref(NEW_ID)}
      />

      <ConfirmationDialog
        visible={visible}
        onDismiss={toggleVisible}
        title="Delete Selected Cards?"
        approveText="Delete"
        cancelText="Cancel"
        onCancel={toggleVisible}
        onApprove={handelDeleteMany}
      />
    </View>
  );
}
