import {
  View,
  FlatList,
  ListRenderItem,
  StyleProp,
  ViewStyle,
} from "react-native";
import { Text } from "react-native-paper";
import { text } from "@/constants/styles";
import { GestureWrapper } from "../shared/GestureWrapper";
import MultiSelectActionBar from "../shared/MultiSelectActionBar";
import { ObjType } from "@/types/generic";
import { ObjLinkProps, TestLinkProps } from "@/utils/links";
import { Href } from "expo-router";

export type ManyTilesProps<T> = {
  isMultiSelect: boolean;
  selectedIds: number[];
  clearSelectedIds: () => void;
  onTagMany?: () => void;
  onUnTagMany?: () => void;
  onDeleteMany?: () => void;
  onTestMany?: (type?: ObjType) => void;
  objs?: T[];
  renderItem: ListRenderItem<T> | null | undefined;
  noObjsMessage: string;
  contentContainerStyle?: StyleProp<ViewStyle>;
  href?: Href<ObjLinkProps | TestLinkProps>;
  type: ObjType;
};

export function ManyTiles<T>({
  href,
  isMultiSelect,
  selectedIds,
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
              keyExtractor={(_, index) => index.toString()}
              contentContainerStyle={contentContainerStyle}
              renderItem={renderItem}
            />
          )}
        </View>
      </GestureWrapper>
      <MultiSelectActionBar
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
