import React from 'react';
import {View} from 'react-native';
import {container, flex} from '../../constants/styles';
import {useEffect, useState} from 'react';
import {MultiSelect} from '../../hooks/useMultiSelect';
import ListActions from '../../components/shared/ListActions';
import {TagsManyTiles} from '../../components/tags/TagsManyTiles';
import ConfirmationDialog from '../../components/shared/ConfirmationDialog';
import {useVisible} from '../../hooks/useVisible';
import {Tag} from '../../types/Tag';
import {TagService} from '../../services/Tag';
import {Conf} from '../../types/Conf';
import {CRUDMode, NEW_ID, ObjType} from '../../types/generic';
import {RootStack} from '../../navigation/MainStack';
import TagsActionBar from './TagsActionBar';
import DialogActionBar from '../shared/DialogActionBar';

interface TagsProps {
  isRootless?: boolean;
  conf: Conf;
  tags: Tag[];
  tagService: TagService;
  multiSelect: MultiSelect;
  onSelectMany?: () => void;
  navigation?: RootStack;
}

export default function Tags({
  isRootless,
  conf,
  tags,
  tagService,
  onSelectMany,
  multiSelect,
  navigation,
}: TagsProps) {
  const [tagsLocal, setTagsLocal] = useState(tags);
  const [query, setQuery] = useState('');
  const {
    isMultiSelect,
    selectedIdsRef,
    selectedIds,
    toggleIdSelection,
    clearSelectedIds,
  } = multiSelect;

  const {visible, toggleVisible} = useVisible();

  useEffect(() => {
    setTagsLocal(
      tags.filter(e =>
        e.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
      ),
    );
  }, [tags, query]);

  const handelDeleteMany = async () => {
    await tagService.deleteMany(selectedIdsRef.current);
    clearSelectedIds();
  };

  const handelTestMany = () => {
    if (navigation) {
      navigation.navigate('Test', {
        tagIds: selectedIdsRef.current,
        cardIds: [],
        type: ObjType.Tag,
      });
    }
  };

  return (
    <View style={[flex.f1]}>
      <ListActions conf={conf} query={query} onQueryChange={setQuery} />

      <TagsManyTiles
        navigation={navigation}
        isRootless={isRootless}
        isMultiSelect={isMultiSelect}
        selectedIds={selectedIds}
        toggleIdSelection={toggleIdSelection}
        clearSelectedIds={clearSelectedIds}
        tags={tagsLocal}
      >
        {isRootless ? (
          <DialogActionBar onSelectMany={onSelectMany} />
        ) : (
          <TagsActionBar
            isMultiSelect={isMultiSelect}
            onDeleteMany={toggleVisible}
            onTestMany={handelTestMany}
            onEditTag={() =>
              navigation.navigate('Tag', {id: NEW_ID, mode: CRUDMode.Create})
            }
          />
        )}
      </TagsManyTiles>

      <ConfirmationDialog
        visible={visible}
        onDismiss={toggleVisible}
        title="Delete Selected Tags?"
        approveText="Delete"
        cancelText="Cancel"
        onCancel={toggleVisible}
        onApprove={handelDeleteMany}
      />
    </View>
  );
}
