import React, { useState } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { Searchbar } from "react-native-paper";

interface AutocompleteProps<T> {
  onSearchChange: (query: string) => T[];
  onSelect: (item: T) => void;
  keyExtractor: (item: T) => string;
  itemComponent: React.FC<{ item: T }>;
}

const Autocomplete = <T,>({
  onSelect,
  keyExtractor,
  itemComponent,
  onSearchChange,
}: AutocompleteProps<T>) => {
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState<T[]>([]);
  const [selectedItems, setSelectedItems] = useState<T[]>([]);

  const onChangeSearch = (query: string) => {
    setQuery(query);

    if (query.length > 0) {
      const filtered = onSearchChange(query);
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  };

  const onSelectItem = (item: T) => {
    onSelect(item);
    setSelectedItems([...selectedItems, item]);
  };

  const getStyle = (item: T) => {
    return selectedItems.includes(item) ? { opacity: 0.5 } : {};
  };

  return (
    <View style={{ padding: 16 }}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={query}
      />

      {filteredData.length > 0 && (
        <FlatList
          data={filteredData}
          scrollEnabled={false}
          keyExtractor={keyExtractor}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onSelectItem(item)}>
              <View pointerEvents="none" style={getStyle(item)}>
                {React.createElement(itemComponent, {
                  item,
                })}
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default Autocomplete;
