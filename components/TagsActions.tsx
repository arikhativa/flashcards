import { gap, margin } from "@/constants/styles";
import { View } from "react-native";
import { Searchbar } from "react-native-paper";

interface TagsActionsProps {
  query: string;
  onQueryChange: (text: string) => void;
}

export default function TagsActions({
  query,
  onQueryChange,
}: TagsActionsProps) {
  return (
    <View style={[margin.x2, margin.top3, margin.bottom2]}>
      <View style={[margin.bottom2, gap.base, { flexDirection: "row" }]}>
        <Searchbar
          placeholder="Search"
          onChangeText={onQueryChange}
          value={query}
          style={{ flex: 1 }}
        />
      </View>
    </View>
  );
}
