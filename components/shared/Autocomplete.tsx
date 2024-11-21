import { baseUnit, color, margin, text } from "@/constants/styles";
import React, { useState } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { Searchbar, Text, IconButton } from "react-native-paper";
import { container } from "../../constants/styles";

interface AutocompleteProps<T> {
  onSearchChange: (query: string) => T[];
  onSelect: (item: T) => void;
  keyExtractor: (item: T) => string;
  itemComponent: React.FC<{ item: T }>;
  onCreateEmpty?: (text: string) => Promise<void>;
  placeholder?: string;
  showIcon?: boolean;
}

const Autocomplete = <T,>({
  showIcon,
  placeholder,
  onSelect,
  keyExtractor,
  itemComponent,
  onSearchChange,
  onCreateEmpty,
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
    if (isSelected(item)) {
      return;
    }

    onSelect(item);
    setSelectedItems([...selectedItems, item]);
  };

  const getStyle = (item: T) => {
    return selectedItems.includes(item) ? color.opacity5 : {};
  };

  const isSelected = (item: T): boolean => {
    return selectedItems.includes(item);
  };

  return (
    <View style={[container.flex1, { maxHeight: 400 }]}>
      <View
        style={[
          margin.bottom,
          {
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
          },
        ]}
      >
        <Searchbar
          placeholder={placeholder}
          onChangeText={onChangeSearch}
          value={query}
          style={{ flex: 1 }}
          iconColor={showIcon ? undefined : "transparent"}
        />
        {onCreateEmpty && (
          <IconButton
            disabled={query.length === 0}
            icon="plus"
            size={baseUnit * 2}
            mode="contained-tonal"
            onPress={() => onCreateEmpty(query)}
          ></IconButton>
        )}
      </View>

      {!filteredData.length && query.length > 0 && (
        <View style={container.center}>
          <Text style={text.grayMessage}>No results found</Text>
        </View>
      )}

      {filteredData.length > 0 && (
        <FlatList
          data={filteredData}
          scrollEnabled={true}
          keyExtractor={keyExtractor}
          numColumns={3}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
          renderItem={({ item }) => (
            // TODO there is no click animation
            // there is an issue where the click animation change the op to .5 and then to 1
            // and then the style change via getStyle back to 5
            <TouchableOpacity
              disabled={isSelected(item)}
              activeOpacity={0.5}
              style={getStyle(item)}
              onPress={() => onSelectItem(item)}
            >
              <View pointerEvents="none">
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
