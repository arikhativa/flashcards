import { StyleProp, View, ViewStyle } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { PropsWithChildren } from "react";

type InputHelperProps = PropsWithChildren<{
  error?: string;
  style?: StyleProp<ViewStyle>;
}>;

export default function InputHelper({
  style,
  error,
  children,
}: InputHelperProps) {
  const theme = useTheme();
  return (
    <View style={style}>
      {children}
      <Text style={{ color: theme.colors.error }} variant="bodyMedium">
        {error || ""}
      </Text>
    </View>
  );
}
