import { View, FlatList, StyleProp, ViewStyle } from "react-native";
import { Text } from "react-native-paper";
import { text } from "@/constants/styles";
import { GestureWrapper } from "../shared/GestureWrapper";
import MultiSelectActionBar from "../shared/MultiSelectActionBar";
import { BaseCrud, ObjType } from "@/types/generic";
import { ObjLinkProps, TestLinkProps } from "@/utils/links";
import { Href } from "expo-router";
import { useCallback } from "react";

export type ManyTilesProps<T> = {
  isMultiSelect: boolean;
  selectedIds: number[];
  clearSelectedIds: () => void;
  onSelectMany?: () => void;
  onTagMany?: () => void;
  onUnTagMany?: () => void;
  onBrowseMany?: () => void;
  onDeleteMany?: () => void;
  onTestMany?: (type?: ObjType) => void;
  objs?: T[];
  renderItem: ({ item }: { item: T }) => React.JSX.Element;
  noObjsMessage: string;
  contentContainerStyle?: StyleProp<ViewStyle>;
  href?: Href<ObjLinkProps | TestLinkProps>;
  type: ObjType;
  isRootless?: boolean;
};

export function ManyTiles<T extends BaseCrud>({
  onSelectMany,
  isRootless,
  href,
  isMultiSelect,
  selectedIds,
  onBrowseMany,
  onDeleteMany,
  onTagMany,
  onUnTagMany,
  onTestMany,
  renderItem,
  clearSelectedIds,
  noObjsMessage,
  contentContainerStyle,
  type,
  objs,
}: ManyTilesProps<T>) {
  const betterRenderItem = useCallback(renderItem, [renderItem]);

  return (
    <View style={{ flex: 1 }}>
      <GestureWrapper onTap={clearSelectedIds} enabled={isMultiSelect}>
        <View style={{ flex: 1 }}>
          {!objs || objs.length === 0 ? (
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={text.grayMessage}>{noObjsMessage}</Text>
            </View>
          ) : (
            <FlatList
              data={objs}
              keyExtractor={(objs) => objs.id.toString()}
              contentContainerStyle={contentContainerStyle}
              renderItem={betterRenderItem}
            />
          )}
        </View>
      </GestureWrapper>
      <MultiSelectActionBar
        isRootless={isRootless}
        onSelectMany={onSelectMany}
        onBrowseMany={onBrowseMany}
        type={type}
        isMultiSelect={isMultiSelect}
        selectedIds={selectedIds}
        onDeleteMany={onDeleteMany}
        onTagMany={onTagMany}
        onUnTagMany={onUnTagMany}
        href={href}
        onTestMany={onTestMany}
      />
    </View>
  );
}
