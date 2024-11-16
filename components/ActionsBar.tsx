import { container, margin } from "@/constants/styles";
import { StyleProp, TextStyle, View } from "react-native";
import { FAB } from "react-native-paper";
import { Href, Link } from "expo-router";
import { getTestHref, ObjLinkProps, TestLinkProps } from "@/utils/links";
import { useEffect, useState } from "react";

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
  const [buttonsLocal, setButtonsLocal] = useState<FABProps[]>(buttons);

  useEffect(() => {
    if (toggle === undefined || toggledButtons === undefined) return;
    if (toggle) {
      setButtonsLocal(toggledButtons);
    } else {
      setButtonsLocal(buttons);
    }
  }, [buttons, toggle, toggledButtons]);

  return (
    <View
      style={[
        style,
        margin.base4,
        container.bottom,
        { width: "80%", flexDirection: "row-reverse", gap: 20 },
      ]}
    >
      {buttonsLocal.map((e, index) => {
        if (e.href) {
          return (
            <Link key={index} href={e.href} asChild>
              <FAB
                disabled={isDisabled ? isDisabled(index) : false}
                icon={e.icon}
              />
            </Link>
          );
        }
        return (
          <FAB
            disabled={isDisabled ? isDisabled(index) : false}
            key={index}
            icon={e.icon}
            onPress={e.onPress}
          />
        );
      })}
    </View>
  );
}
