import React from 'react';
import {Card} from '../../types/Card';
import {Dimensions} from 'react-native';
import {useEffect, useState} from 'react';
import {CRUDMode, ObjType} from '../../types/generic';
import {ManyTiles} from '../shared/ManyTiles';
import CardRowMemo, {Row} from './CardRowMemo';
import {useNavigation} from '@react-navigation/native';
import {RootStack} from '../../navigation/MainStack';

const minCardSize = 51.8;
const averageCharWidth = 7.5;
const gap = 20;
const TILE_HEIGHT = 120;

export type CardManyTilesProps = {
  isRootless?: boolean;
  onSelectMany?: () => void;
  isMultiSelect: boolean;
  selectedIds: number[];
  toggleIdSelection: (id: number) => void;
  clearSelectedIds: () => void;
  onBrowseMany?: () => void;
  onTagMany?: () => void;
  onDeleteMany?: () => void;
  onTestMany?: (type?: ObjType) => void;
  cards?: Card[];
  navigation?: RootStack;
};

export function CardsManyTiles({
  navigation,
  isRootless,
  onBrowseMany,
  onSelectMany,
  isMultiSelect,
  selectedIds,
  toggleIdSelection,
  onDeleteMany,
  onTagMany,
  onTestMany,
  clearSelectedIds,
  cards,
}: CardManyTilesProps) {
  const maxSize = isRootless
    ? Dimensions.get('window').width * 0.9
    : Dimensions.get('window').width;

  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    convertCardsToRows(cards || []);
  }, [cards, maxSize]);

  const convertCardsToRows = (cards: Card[]) => {
    const newRows: Row[] = [];
    let tmpRow: Card[] = [];

    cards.forEach(card => {
      const newCardSize = getCardSize(card);
      const rowSize = getRowSize(tmpRow);
      if (rowSize + newCardSize > maxSize || tmpRow.length === 4) {
        newRows.push({
          id: getMixedIds(tmpRow),
          cards: tmpRow,
        });

        tmpRow = [];
      }
      tmpRow.push(card);
    });

    if (tmpRow.length) {
      newRows.push({
        id: getMixedIds(tmpRow),
        cards: tmpRow,
      });
    }
    setRows(newRows);
  };

  const handleLongPress = (id: number) => {
    toggleIdSelection(id);
  };

  const handlePress = (id: number) => {
    if (isMultiSelect || isRootless) {
      toggleIdSelection(id);
    } else {
      if (!navigation) {
        return;
      }
      navigation.navigate('Card', {
        id: id.toString(),
        mode: CRUDMode.Update,
      });
    }
  };

  const renderRow = ({item}: {item: Row}) => {
    return (
      <CardRowMemo
        item={item}
        tileHeight={TILE_HEIGHT}
        onLongPress={handleLongPress}
        onPress={handlePress}
        isSelected={(id: number) => selectedIds.includes(id)}
      />
    );
  };

  return (
    <ManyTiles
      navigation={navigation}
      tileHeight={TILE_HEIGHT}
      isRootless={isRootless}
      onBrowseMany={onBrowseMany}
      onSelectMany={onSelectMany}
      isMultiSelect={isMultiSelect}
      selectedIds={selectedIds}
      clearSelectedIds={clearSelectedIds}
      onTagMany={onTagMany}
      onDeleteMany={onDeleteMany}
      onTestMany={onTestMany}
      objs={rows}
      renderItem={renderRow}
      noObjsMessage="No cards"
      contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
      type={ObjType.Card}
    />
  );
}

function getCardSize(c: Card) {
  return (
    minCardSize + Math.max(c.sideA.length, c.sideB.length) * averageCharWidth
  );
}

function getRowSize(row: Card[]) {
  let size = 0;
  row.forEach((c, index) => {
    if (index !== 0) {
      size += gap;
    }
    size += getCardSize(c);
  });
  return size;
}

function getMixedIds(row: Card[]): number {
  let mixedIds: string = '';
  row.forEach(c => (mixedIds += c.id));
  return parseInt(mixedIds, 10);
}
