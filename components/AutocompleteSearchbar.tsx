import React, { useState } from "react";
import { View, FlatList, TouchableOpacity, Text } from "react-native";
import { Searchbar } from "react-native-paper";

interface AutocompleteSearchbarProps<T> {
  onSearchChange: (query: string) => T[];
  onSelect: (item: T) => void;
  keyExtractor: (item: T) => string;
  toStringItem: (item: T) => string;
}

const AutocompleteSearchbar = <T,>({
  onSelect,
  keyExtractor,
  toStringItem,
  onSearchChange,
}: AutocompleteSearchbarProps<T>) => {
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState<T[]>([]);

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
    setQuery("");
    setFilteredData([]);
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
              <Text style={{ padding: 8 }}>{toStringItem(item)}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default AutocompleteSearchbar;
