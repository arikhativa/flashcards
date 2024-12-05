import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import {Card as PaperCard} from 'react-native-paper';
import {color, padding} from '../../constants/styles';

type CardCommentProps = {
  style?: StyleProp<ViewStyle>;
  disabled: boolean;
  value: string;
  onChangeText?: (text: string) => void;
};

const CardComment = ({
  style,
  onChangeText,
  value,
  disabled,
}: CardCommentProps) => {
  return (
    <View style={style}>
      <Text style={padding.bottom} variant="titleMedium">
        Comment
      </Text>
      <PaperCard>
        <PaperCard.Content>
          <TextInput
            editable={!disabled}
            style={color.bgTransparent}
            underlineColor="transparent"
            activeUnderlineColor="transparent"
            multiline
            numberOfLines={3}
            onChangeText={onChangeText}
            value={value}
          />
        </PaperCard.Content>
      </PaperCard>
    </View>
  );
};

export default CardComment;
