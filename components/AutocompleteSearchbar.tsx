import React, { useState } from "react";
import { View, FlatList, TouchableOpacity, Text } from "react-native";
import { Searchbar } from "react-native-paper";

const AutocompleteSearchbar = () => {
  const data = ["Apple", "Banana", "Orange", "Pineapple", "Grapes", "Mango"];

  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState<string[]>([]);

  const onChangeSearch = (query: string) => {
    setQuery(query);

    if (query.length > 0) {
      const filtered = data.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  };

  const onSelectSuggestion = (suggestion: string) => {
    setQuery(suggestion);
    setFilteredData([]); // Clear suggestions after selection
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
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onSelectSuggestion(item)}>
              <Text style={{ padding: 8 }}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default AutocompleteSearchbar;
