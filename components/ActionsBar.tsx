import { container, margin } from "@/constants/styles";
import { View } from "react-native";
import { FAB } from "react-native-paper";
import { Href, Link } from "expo-router";
import { getTestHref, ObjLinkProps, TestLinkProps } from "@/utils/links";
import { useEffect, useState } from "react";

interface FABProps {
  icon: string;
  onPress?: () => void;
  href?: Href<ObjLinkProps | TestLinkProps>;
}

interface ActionsBarProps {
  isMultiSelect: boolean;
  selectedIds: number[];
  onDeselectAll: () => void;
  deleteMany?: (list: number[]) => void;
  href?: Href<ObjLinkProps | TestLinkProps>;
  testMany?: () => void;
}

export default function ActionsBar({
  isMultiSelect,
  selectedIds,
  onDeselectAll,
  deleteMany,
  href,
  testMany,
}: ActionsBarProps) {
  const [buttons, setButtons] = useState<FABProps[]>([]);

  useEffect(() => {
    const setMultiSelectButtons = () => {
      const buttons: FABProps[] = [];

      if (testMany) {
        buttons.push({
          icon: "test-tube",
          onPress: testMany,
        });
      }

      buttons.push({
        icon: "arrow-left",
        onPress: onDeselectAll,
      });

      if (deleteMany) {
        buttons.push({
          icon: "trash-can-outline",
          onPress: () => deleteMany(selectedIds),
        });
      }

      setButtons(buttons);
    };

    if (isMultiSelect) {
      setMultiSelectButtons();
    } else if (href) {
      setButtons([
        {
          icon: "plus",
          href: href,
        },
        {
          icon: "test-tube",
          href: getTestHref(),
        },
      ]);
    }
  }, [isMultiSelect, selectedIds]);

  return (
    <View
      style={[
        margin.base4,
        container.bottom,
        { width: "80%", flexDirection: "row-reverse", gap: 20 },
      ]}
    >
      {buttons.map((e, index) => {
        if (e.href) {
          return (
            <Link key={index} href={e.href} asChild>
              <FAB icon={e.icon} />
            </Link>
          );
        }
        return <FAB key={index} icon={e.icon} onPress={e.onPress} />;
      })}
    </View>
  );
}
