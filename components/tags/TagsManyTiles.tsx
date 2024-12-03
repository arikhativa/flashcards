import React, {PropsWithChildren} from 'react';
import {Tag} from '../../types/Tag';
import {CRUDMode} from '../../types/generic';
import {ManyTiles} from '../shared/ManyTiles';
import TagTileMemo from './TagTileMemo';
import {RootStack} from '../../navigation/MainStack';
import {StyleProp, ViewStyle} from 'react-native';

const TILE_HEIGHT = 55;

export type TagsManyTilesProps = PropsWithChildren<{
  isRootless?: boolean;
  isMultiSelect: boolean;
  selectedIds: number[];
  toggleIdSelection: (id: number) => void;
  clearSelectedIds: () => void;
  tags?: Tag[];
  navigation?: RootStack;
}>;

export function TagsManyTiles({
  isRootless,
  isMultiSelect,
  selectedIds,
  toggleIdSelection,
  clearSelectedIds,
  navigation,
  children,
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
      tileHeight={TILE_HEIGHT}
      isMultiSelect={isMultiSelect}
      clearSelectedIds={clearSelectedIds}
      objs={tags}
      renderItem={renderItem}
      noObjsMessage="No tags"
      contentContainerStyle={contentContainerStyle}
    >
      {children}
    </ManyTiles>
  );
}

const contentContainerStyle: StyleProp<ViewStyle> = {
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
};
