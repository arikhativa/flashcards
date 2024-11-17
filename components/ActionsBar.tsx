import { baseUnit, container, margin } from "@/constants/styles";
import { StyleProp, TextStyle, View } from "react-native";
import { FAB } from "react-native-paper";
import { Href } from "expo-router";
import { ObjLinkProps, TestLinkProps } from "@/utils/links";

export interface FABProps {
  icon: string;
  onPress?: () => void;
  href?: Href<ObjLinkProps | TestLinkProps> | Href;
}

interface ActionsBarProps {
  style?: StyleProp<TextStyle>;
  buttons: FABProps[];
  toggle?: boolean;
  toggledButtons?: FABProps[];
  isDisabled?: (index: number) => boolean;
}

export default function ActionsBar({
  style,
  buttons,
  toggle,
  toggledButtons,
  isDisabled,
}: ActionsBarProps) {
  const getIcon = (index: number) => {
    if (toggledButtons && toggle) {
      if (index >= toggledButtons.length) return "";
      return toggledButtons[index].icon;
    }
    if (index >= buttons.length) return "";
    return buttons[index].icon;
  };

  const handleOnPress = (index: number) => {
    if (toggledButtons && toggle) {
      if (toggledButtons[index] && toggledButtons[index].onPress) {
        return toggledButtons[index].onPress;
      }
    }
    if (buttons[index] && buttons[index].onPress) {
      return buttons[index].onPress;
    }
  };

  const getVisibility = (index: number): boolean => {
    if (toggledButtons && toggle) {
      if (toggledButtons[index]) {
        return true;
      }
    }
    if (buttons[index] && buttons[index].onPress) {
      return true;
    }
    return false;
  };

  const getButtons = () => {
    const list: React.JSX.Element[] = [];
    for (let i = 0; i < 4; i++) {
      list.push(
        <FAB
          visible={getVisibility(i)}
          key={i}
          disabled={isDisabled ? isDisabled(i) : false}
          icon={getIcon(i)}
          onPress={handleOnPress(i)}
        />
      );
    }
    return list;
  };

  return (
    <View
      style={[
        style,
        margin.base4,
        container.bottom,
        { width: "80%", flexDirection: "row-reverse", gap: baseUnit * 2 },
      ]}
    >
      {getButtons()}
    </View>
  );
}
