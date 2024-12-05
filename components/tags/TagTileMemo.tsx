import {memo} from 'react';
import {TagTile} from './TagTile';
import {Tag} from '../../types/Tag';

interface TagTileMemoProps {
  item: Tag;
  tileHeight: number;
  onLongPress?: (id: number) => void;
  onPress?: (id: number) => void;
  isSelected: (id: number) => boolean;
  showSize?: boolean;
}

const TagTileMemo = memo(
  ({
    item,
    tileHeight,
    onLongPress,
    onPress,
    isSelected,
    showSize,
  }: TagTileMemoProps) => {
    return (
      <TagTile
        style={{height: tileHeight}}
        isSelected={isSelected(item.id)}
        onLongPress={onLongPress}
        onPress={onPress}
        showSize={showSize}
        tag={item}
      />
    );
  },
);

TagTileMemo.displayName = 'TagTileMemo';

export default TagTileMemo;
