import {Card} from '../../types/Card';
import {Text, useTheme} from 'react-native-paper';
import {Card as PaperCard} from 'react-native-paper';
import {Divider} from 'react-native-paper';
import {margin} from '../../constants/styles';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {KnowledgeLevel, KnowledgeLevelColor} from '../../types/KnowledgeLevel';
import {GestureWrapper} from '../shared/GestureWrapper';

export type CardTileProps = {
  style?: StyleProp<ViewStyle>;
  card: Card;
  onPress?: (id: number) => void;
  onLongPress?: (id: number) => void;
  isSelected?: boolean;
};

export function CardTile({
  style,
  card,
  onPress,
  onLongPress,
  isSelected,
}: CardTileProps) {
  const {colors} = useTheme();

  const getSelectedStyle = (): StyleProp<ViewStyle> => {
    return isSelected
      ? {
          backgroundColor: colors.secondaryContainer,
        }
      : {};
  };

  const getKLStyle = () => {
    switch (card.knowledgeLevel) {
      case KnowledgeLevel.Learning:
        return styles.Learning;
      case KnowledgeLevel.GettingThere:
        return styles.GettingThere;
      case KnowledgeLevel.Confident:
        return styles.Confident;
      default:
        return {};
    }
  };

  return (
    <GestureWrapper
      onTap={onPress && (() => onPress(card.id))}
      onLongPress={onLongPress && (() => onLongPress(card.id))}>
      <View style={style}>
        <PaperCard style={[margin.base, getSelectedStyle(), getKLStyle()]}>
          <PaperCard.Content>
            <View style={[styles.sideViewHeightA]}>
              <Text style={styles.text} variant="titleSmall">
                {card.sideA}
              </Text>
            </View>
            <Divider />
            <View style={[styles.sideViewHeightB]}>
              <Text style={styles.text} variant="titleSmall">
                {card.sideB}
              </Text>
            </View>
          </PaperCard.Content>
        </PaperCard>
      </View>
    </GestureWrapper>
  );
}

const HEIGHT = 30;
const BORDER_SIZE = 10;

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
  },
  Learning: {
    borderBottomColor: KnowledgeLevelColor.Learning,
    borderBottomWidth: BORDER_SIZE,
  },
  GettingThere: {
    borderBottomColor: KnowledgeLevelColor.GettingThere,
    borderBottomWidth: BORDER_SIZE,
  },
  Confident: {
    borderBottomColor: KnowledgeLevelColor.Confident,
    borderBottomWidth: BORDER_SIZE,
  },
  sideViewHeightA: {
    width: 'auto',
    height: HEIGHT,
  },
  sideViewHeightB: {
    width: 'auto',
    marginTop: 10,
    marginBottom: -5,
    height: HEIGHT - BORDER_SIZE,
  },
});
