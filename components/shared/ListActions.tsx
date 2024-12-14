import React from 'react';
import {baseUnit, flex, gap, margin} from '../../constants/styles';
import {FilterChip} from '../../types/generic';
import {SelectedKL} from '../../types/KnowledgeLevel';
import {FlatList, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {Chip, Searchbar, Surface} from 'react-native-paper';
import SortCards from '../cards/SortCards';
import FilterCards from '../cards/FilterCards';
import {Sort} from '../../types/Sort';
import {TimeDropdown} from '../../hooks/useTimeDropdown';
import {Conf} from '../../types/Conf';

interface ListActionsProps {
  conf: Conf;
  style?: StyleProp<ViewStyle>;
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
  style,
  conf,
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
    <Surface style={[style, margin.bottom2]} mode="flat" elevation={1}>
      <View style={[margin.x2, margin.top4, margin.bottom2]}>
        <View
          style={[
            styles.height,
            margin.bottom2,
            gap.base,
            flex.row,
            flex.alignCenter,
          ]}
        >
          {query !== undefined && onQueryChange && (
            <Searchbar
              placeholder="Search"
              onChangeText={onQueryChange}
              value={query}
              style={flex.f1}
            />
          )}
          {sort && onSortChange && (
            <SortCards conf={conf} sort={sort} onSortChange={onSortChange} />
          )}
          {selectedKL && onKLChange && (
            <FilterCards
              hide
              timeDropdown={timeDropdown}
              selectedKL={selectedKL}
              onKLChange={onKLChange}
            />
          )}
        </View>
        <View>
          <FlatList
            contentContainerStyle={[flex.justifyCenter, flex.alignCenter]}
            data={filters}
            horizontal
            keyExtractor={(_filters, index) => index.toString()}
            renderItem={({item}) => (
              <Chip
                closeIcon={'close'}
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

const styles = StyleSheet.create({
  height: {
    height: 40,
  },
});
