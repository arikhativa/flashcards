import { View } from "react-native";
import { Text, Checkbox } from "react-native-paper";

type CheckboxTextProps = {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

export default function CheckboxText({
  label,
  checked,
  onCheckedChange,
}: CheckboxTextProps) {
  return (
    <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
      <Text>{label}</Text>
      <Checkbox
        status={checked ? "checked" : "unchecked"}
        onPress={() => {
          onCheckedChange(!checked);
        }}
      />
    </View>
  );
}
