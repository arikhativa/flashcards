import React from 'react';
import {Tag} from '../../types/Tag';
import {CRUDMode, ObjType} from '../../types/generic';
import {ManyTiles} from '../shared/ManyTiles';
import TagTileMemo from './TagTileMemo';
import {RootStack} from '../../navigation/MainStack';

const TILE_HEIGHT = 55;

export type TagsManyTilesProps = {
  isRootless?: boolean;
  onSelectMany?: () => void;
  isMultiSelect: boolean;
  selectedIds: number[];
  toggleIdSelection: (id: number) => void;
  clearSelectedIds: () => void;
  onDeleteMany?: () => void;
  onTestMany?: (type?: ObjType) => void;
  tags?: Tag[];
  navigation?: RootStack;
};

export function TagsManyTiles({
  isRootless,
  onSelectMany,
  isMultiSelect,
  selectedIds,
  toggleIdSelection,
  onDeleteMany,
  onTestMany,
  clearSelectedIds,
  navigation,
  tags,
}: TagsManyTilesProps) {
  const handleLongPress = (id: number) => {
    toggleIdSelection(id);
  };

  // TODO this can be in a custom useHook since we have the same func in CardsManyTiles
  const handlePress = (id: number) => {
    if (isMultiSelect || isRootless) {
      toggleIdSelection(id);
    } else {
      if (navigation) {
        navigation.navigate('Tag', {
          id: id.toString(),
          mode: CRUDMode.Update,
        });
      }
    }
  };

  const renderItem = ({item}: {item: Tag}) => (
    <TagTileMemo
      tileHeight={TILE_HEIGHT}
      isSelected={(id: number) => selectedIds.includes(id)}
      item={item}
      onLongPress={handleLongPress}
      onPress={handlePress}
      showSize
    />
  );

  return (
    <ManyTiles
      navigation={navigation}
      tileHeight={TILE_HEIGHT}
      isRootless={isRootless}
      isMultiSelect={isMultiSelect}
      selectedIds={selectedIds}
      onSelectMany={onSelectMany}
      clearSelectedIds={clearSelectedIds}
      onDeleteMany={onDeleteMany}
      onTestMany={onTestMany}
      objs={tags}
      renderItem={renderItem}
      noObjsMessage="No tags"
      contentContainerStyle={{
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      }}
      type={ObjType.Tag}
    />
  );
}
