import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { margin } from "../constants/styles";
import { PropsWithChildren } from "react";

type InputHelperProps = PropsWithChildren<{
  error?: string;
}>;

export default function InputHelper({ error, children }: InputHelperProps) {
  const theme = useTheme();
  return (
    <View style={margin.top2}>
      {children}
      <Text style={{ color: theme.colors.error }} variant="bodyMedium">
        {error || ""}
      </Text>
    </View>
  );
}
