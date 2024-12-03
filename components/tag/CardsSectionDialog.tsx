import React, {useEffect} from 'react';
import {View} from 'react-native';
import {Dialog, Portal} from 'react-native-paper';
import {useStore} from '../../providers/GlobalStore';
import {Card} from '../../types/Card';
import {useMultiSelect} from '../../hooks/useMultiSelect';
import Cards from '../cards/Cards';

interface CardsSectionDialogProps {
  onDismiss: () => void;
  setTags: (cards: Card[]) => void;
  visible: boolean;
  cardsLocal?: Card[];
}

const CardsSectionDialog = ({
  cardsLocal,
  visible,
  onDismiss,
  setTags,
}: CardsSectionDialogProps) => {
  const store = useStore();
  const multiSelect = useMultiSelect();

  useEffect(() => {
    if (cardsLocal) {
      multiSelect.setSelectedIds(cardsLocal.map(t => t.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardsLocal]);

  const handleSelectMany = () => {
    const cardList: Card[] = multiSelect.selectedIdsRef.current.map(id =>
      store.cards.find(t => t.id === id),
    ) as Card[];

    multiSelect.clearSelectedIds();
    setTags(cardList);
    onDismiss();
  };

  return (
    <Portal>
      {visible && (
        <View
          style={{
            flex: 1,
          }}
        >
          <Dialog
            dismissableBackButton
            style={{flex: 1, overflow: 'hidden'}}
            visible={visible}
            onDismiss={onDismiss}
          >
            <Cards
              isRootless
              onSelectMany={handleSelectMany}
              store={store}
              multiSelect={multiSelect}
            />
          </Dialog>
        </View>
      )}
    </Portal>
  );
};

export default CardsSectionDialog;
