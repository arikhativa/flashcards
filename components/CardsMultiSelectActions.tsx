import { container, margin } from "@/constants/styles";
import { View } from "react-native";
import { FAB } from "react-native-paper";
import { useStore } from "@/providers/GlobalStore";

interface CardsMultiSelectActionsProps {
  selectedIds: number[];
  onDeselectAll: () => void;
  disableDelete?: boolean;
}

export default function CardsMultiSelectActions({
  selectedIds,
  onDeselectAll,
  disableDelete,
}: CardsMultiSelectActionsProps) {
  const { cardService } = useStore();

  return (
    <View
      style={[
        margin.base2,
        container.bottom,
        { flexDirection: "row", gap: 20 },
      ]}
    >
      {!disableDelete && (
        <FAB
          icon="trash-can-outline"
          onPress={() => {
            cardService.deleteMany(selectedIds);
            onDeselectAll();
          }}
        />
      )}
      <FAB icon="arrow-left" onPress={onDeselectAll} />
      <FAB icon="test-tube" />
    </View>
  );
}
