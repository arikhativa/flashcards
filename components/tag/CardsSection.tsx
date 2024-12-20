import React from 'react';
import {View} from 'react-native';
import {Card} from '../../types/Card';
import {flex, margin, padding} from '../../constants/styles';
import {CardsManyTiles} from '../cards/CardsManyTiles';
import CardsSectionDialog from './CardsSectionDialog';
import CardsSectionActionBar from './CardsSectionActionBar';
import {useNavigation} from '@react-navigation/native';
import {RootStack} from '../../navigation/MainStack';

interface CardsSectionProps {
  cards?: Card[];
  setCards: (cards: Card[]) => void;
  isMultiSelect: boolean;
  selectedIds: number[];
  toggleIdSelection: (id: number) => void;
  clearSelectedIds: () => void;
  onTestMany: () => void;
  onRemoveCardsFromTag: () => void;
}

const CardsSection = ({
  cards,
  setCards,
  isMultiSelect,
  selectedIds,
  clearSelectedIds,
  toggleIdSelection,
  onTestMany,
  onRemoveCardsFromTag,
}: CardsSectionProps) => {
  const navigation = useNavigation<RootStack>();
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  return (
    <View style={[flex.f1]}>
      <CardsManyTiles
        isRootless={false}
        navigation={navigation}
        clearSelectedIds={clearSelectedIds}
        isMultiSelect={isMultiSelect}
        selectedIds={selectedIds}
        toggleIdSelection={toggleIdSelection}
        cards={cards}
      />

      <CardsSectionActionBar
        isMultiSelect={isMultiSelect}
        selectedIds={selectedIds}
        onEditCards={showDialog}
        onTestMany={onTestMany}
        onUntagCards={onRemoveCardsFromTag}
      />

      <CardsSectionDialog
        cardsLocal={cards}
        setTags={setCards}
        visible={visible}
        onDismiss={hideDialog}
      />
    </View>
  );
};

export default CardsSection;
