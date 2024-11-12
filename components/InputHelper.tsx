import { View } from "react-native";
import { TextInput, Text, useTheme } from "react-native-paper";

interface InputHelperProps {
  value: string;
  onValueChange: (value: string) => void;
  label?: string;
  error?: string;
}

export default function InputHelper({
  value,
  onValueChange,
  label,
  error,
}: InputHelperProps) {
  const theme = useTheme();
  return (
    <View>
      <TextInput
        value={value}
        onChangeText={onValueChange}
        label={label}
        error={error ? true : false}
      ></TextInput>
      {error && (
        <Text style={{ color: theme.colors.error }} variant="bodyMedium">
          {error}
        </Text>
      )}
    </View>
  );
}
