import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {Tag} from '../../types/Tag';
import {Chip} from 'react-native-paper';
import {flex, margin, padding} from '../../constants/styles';
import {GestureWrapper} from '../shared/GestureWrapper';

export type TagTileProps = {
  style?: StyleProp<ViewStyle>;
  tag: Tag;
  showSize?: boolean;
  onClose?: () => void;
  onPress?: (id: number) => void;
  onLongPress?: (id: number) => void;
  isSelected?: boolean;
};

// TODO add option to chose an icon for the list?
export function TagTile({
  style,
  tag,
  showSize,
  onClose,
  onPress,
  onLongPress,
  isSelected,
}: TagTileProps) {
  const getSumOfCards = (t: Tag) => {
    if (!showSize || !t.cards.length) {
      return;
    }
    return (
      <Chip style={margin.left} disabled mode="outlined">
        {t.cards.length}
      </Chip>
    );
  };

  return (
    <GestureWrapper
      onTap={onPress && (() => onPress(tag.id))}
      onLongPress={onLongPress && (() => onLongPress(tag.id))}
    >
      <View style={[style, padding.base, flex.row]}>
        <Chip
          closeIcon={onClose ? 'close' : undefined}
          onClose={onClose}
          selected={isSelected}
          style={[flex.alignSelfStart]}
        >
          {tag.name}
        </Chip>
        {getSumOfCards(tag)}
      </View>
    </GestureWrapper>
  );
}
