import React from 'react';
import {View} from 'react-native';
import {container} from '../../constants/styles';
import {useEffect, useState} from 'react';
import {FULL_SELECTED_KL, SelectedKL} from '../../types/KnowledgeLevel';
import {Card} from '../../types/Card';
import {CRUDMode, FilterChip, FilterNames, NEW_ID} from '../../types/generic';
import {isKnowledgeLevelFullOn} from '../../utils/knowledgeLevel';
import {
  getSortDirectionByName,
  sorByAlpha,
  sortByDate,
  sortByKL,
} from '../../utils/sort';
import {MultiSelect} from '../../hooks/useMultiSelect';
import ListActions from '../../components/shared/ListActions';
import {CardsManyTiles} from '../../components/cards/CardsManyTiles';
import {Sort, SortNames} from '../../types/Sort';
import {useTimeDropdown} from '../../hooks/useTimeDropdown';
import {OPTIONS_VALUES} from '../../utils/testForm';
import ConfirmationDialog from '../../components/shared/ConfirmationDialog';
import {useVisible} from '../../hooks/useVisible';
import CreateOrAddTagDialog from '../shared/CreateOrAddTagDialog';
import TagsSectionDialog from '../card/TagsSectionDialog';
import {Tag} from '../../types/Tag';
import {StoreContextType} from '../../providers/GlobalStore';
import {useNavigation} from '@react-navigation/native';
import {MainStackProp} from '../../navigation/MainStack';

interface CardsProps {
  isRootless?: boolean;
  store: StoreContextType;
  multiSelect: MultiSelect;
  onSelectMany?: () => void;
}

export default function Cards({
  isRootless,
  store,
  onSelectMany,
  multiSelect,
}: CardsProps) {
  console.log('Cards render 2');

  const navigation = useNavigation<MainStackProp>();
  const [cardsLocal, setCardsLocal] = useState(store.cards);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<FilterChip[]>([]);

  const timeDropdown = useTimeDropdown(OPTIONS_VALUES.Anytime);

  const [sort, setSort] = useState<Sort>({
    field: store.conf.sortBy,
    direction: getSortDirectionByName(store.conf.sortBy),
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
  const [tagsLocal, setTagsLocal] = useState<Tag[]>([]);
  const confirmation = useVisible();
  const addOrCreateTag = useVisible();
  const addTagDialog = useVisible();

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
      if (filters.find(filter => filter.name === name)) {
        setFilters([...filters.filter(filter => filter.name !== name)]);
      }
    };

    removeFilterIfNeeded();
  }, [filters, timeDropdown.range, selectedKL]);

  useEffect(() => {
    if (!store.conf) {
      return;
    }

    setSort({
      field: store.conf.sortBy,
      direction: getSortDirectionByName(store.conf.sortBy),
    });
  }, [store.conf]);

  useEffect(() => {
    const filterCardsByTimeRanger = (list: Card[]) => {
      const start = timeDropdown.range.startDate || 0;
      const end = timeDropdown.range.endDate || Date.now();
      return list.filter(
        card => card.createdAt >= start && card.createdAt <= end,
      );
    };

    const filterCardsByKL = (list: Card[]) => {
      return list.filter(card => selectedKL[card.knowledgeLevel]);
    };

    const filterCardsBySearch = (list: Card[]) => {
      if (!query || query === '') {
        return list;
      }

      return list.filter(
        card =>
          card.sideA.toLowerCase().includes(query.toLowerCase()) ||
          card.sideB.toLowerCase().includes(query.toLowerCase()),
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
        return sorByAlpha(list, 'sideA', sort.direction);
      }
      if (sort.field === SortNames.SIDE_B_ABC) {
        return sorByAlpha(list, 'sideB', sort.direction);
      }
      return list;
    };

    setCardsLocal(setCardsLocalSort(setCardsLocalWitFilters(store.cards)));
  }, [store.cards, query, selectedKL, timeDropdown.range, sort]);

  const handleGenericFilterSet = (name: FilterNames, onClose: () => void) => {
    if (filters.find(filter => filter.name === name)) {
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
      setSelectedKL(FULL_SELECTED_KL),
    );
  };

  const handelDeleteMany = async () => {
    await store.cardService.deleteMany(selectedIdsRef.current);
    clearSelectedIds();
  };

  const handleAddTag = (tags: Tag[]) => {
    tags.forEach(tag => {
      const newCards: Card[] = selectedIdsRef.current.map(id => {
        return {id} as Card;
      });
      store.tagService.update(tag.id, {cards: [...tag.cards, ...newCards]});
    });
    clearSelectedIds();
  };

  const handleCreateTag = async () => {
    navigation.navigate('Tag', {
      mode: CRUDMode.Create,
      id: NEW_ID,
      cardIds: selectedIdsRef.current,
    });
    clearSelectedIds();
  };

  const handelBrowseMany = () => {
    navigation.navigate('Browse', {
      ids: selectedIdsRef.current,
    });
  };

  return (
    <View style={[container.flex1]}>
      <ListActions
        conf={store.conf}
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
        onBrowseMany={handelBrowseMany}
        onSelectMany={onSelectMany}
        onDeleteMany={confirmation.toggleVisible}
        onTagMany={addOrCreateTag.toggleVisible}
        onTestMany={handelTestMany}
        selectedIds={selectedIds}
        clearSelectedIds={clearSelectedIds}
        toggleIdSelection={toggleIdSelection}
        isMultiSelect={isMultiSelect}
        cards={cardsLocal}
      />

      <ConfirmationDialog
        visible={confirmation.visible}
        onDismiss={confirmation.toggleVisible}
        title="Delete Selected Cards?"
        approveText="Delete"
        cancelText="Cancel"
        onCancel={confirmation.toggleVisible}
        onApprove={handelDeleteMany}
      />

      <CreateOrAddTagDialog
        visible={addOrCreateTag.visible}
        onDismiss={addOrCreateTag.toggleVisible}
        onAdd={addTagDialog.toggleVisible}
        onCreate={handleCreateTag}
      />

      {!isRootless && (
        <TagsSectionDialog
          tagsLocal={tagsLocal}
          setTags={handleAddTag}
          visible={addTagDialog.visible}
          onDismiss={addTagDialog.toggleVisible}
        />
      )}
    </View>
  );
}
