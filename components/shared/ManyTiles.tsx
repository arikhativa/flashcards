import React, {PropsWithChildren} from 'react';
import {View, FlatList, StyleProp, ViewStyle} from 'react-native';
import {Chip, Text} from 'react-native-paper';
import {flex, margin, position, text} from '../../constants/styles';
import {GestureWrapper} from '../shared/GestureWrapper';
import {BaseCrud} from '../../types/generic';
import {useCallback} from 'react';
import {useVisible} from '../../hooks/useVisible';

type Props<T> = PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
  tileHeight: number;
  isMultiSelect: boolean;
  clearSelectedIds?: () => void;
  objs?: T[];
  renderItem: ({item}: {item: T}) => React.JSX.Element;
  noObjsMessage: string;
  contentContainerStyle?: StyleProp<ViewStyle>;
  counter?: number;
}>;

export function ManyTiles<T extends BaseCrud>({
  style,
  tileHeight,
  isMultiSelect,
  renderItem,
  clearSelectedIds,
  noObjsMessage,
  contentContainerStyle,
  objs,
  children,
  counter,
}: Props<T>) {
  const betterRenderItem = useCallback(renderItem, [renderItem]);

  const getItemLayout = (
    data: ArrayLike<T> | undefined | null,
    index: number,
  ) => {
    return {
      length: tileHeight,
      offset: tileHeight * index,
      index,
    };
  };

  const {visible, toggleVisible} = useVisible(true);

  return (
    <View style={[style, flex.f1]}>
      {counter !== undefined && (
        <Chip
          style={[
            position.z1,
            position.absolute,
            position.top0,
            position.right0,
            margin.right2,
          ]}
          onPress={toggleVisible}
          disabled={visible ? false : true}
        >
          {counter}
        </Chip>
      )}
      <GestureWrapper onTap={clearSelectedIds} enabled={isMultiSelect}>
        <View style={flex.f1}>
          {!objs || objs.length === 0 ? (
            <View style={[flex.f1, flex.justifyCenter]}>
              <Text style={text.grayMessage}>{noObjsMessage}</Text>
            </View>
          ) : (
            <FlatList
              getItemLayout={getItemLayout}
              data={objs}
              keyExtractor={row => row.id.toString()}
              contentContainerStyle={contentContainerStyle}
              renderItem={betterRenderItem}
            />
          )}
        </View>
      </GestureWrapper>
      {children}
    </View>
  );
}
