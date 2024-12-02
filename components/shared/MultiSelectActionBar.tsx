import React from 'react';
import {useEffect, useState} from 'react';
import ActionsBar, {DangerButtons, FABProps, MainButtons} from './ActionsBar';
import {CRUDMode, NEW_ID, ObjType} from '../../types/generic';
import {RootStack} from '../../navigation/MainStack';

interface Props {
  type: ObjType;
  isMultiSelect: boolean;
  selectedIds: number[];
  onSelectMany?: () => void;
  onTagMany?: () => void;
  onUnTagMany?: () => void;
  onDeleteMany?: () => void;
  onBrowseMany?: () => void;
  onTestMany?: (type?: ObjType) => void;
  onEditCards?: () => void;
  isRootless?: boolean;
  navigation?: RootStack;
}

export default function MultiSelectActionBar({
  isMultiSelect,
  selectedIds,
  onBrowseMany,
  onTagMany,
  onSelectMany,
  onUnTagMany,
  onEditCards,
  onDeleteMany,
  type,
  isRootless,
  onTestMany,
  navigation,
}: Props) {
  const [buttons, setButtons] = useState<MainButtons>({});
  const [toggledButtons, setToggledButtons] = useState<MainButtons>({});
  const [toggledDangerButtons, setToggledDangerButtons] =
    useState<DangerButtons>({});

  useEffect(() => {
    setGeneralButtons();
  }, []);

  useEffect(() => {
    setMultiSelectButtons();
  }, [selectedIds]);

  const setGeneralButtons = () => {
    if (isRootless) {
      setButtons({
        a: {
          icon: 'check',
          onPress: onSelectMany,
        },
      });
      return; // NOTE this return!
    }

    // This is expanded tag editing cards
    if (onEditCards) {
      setButtons({
        a: {
          icon: 'square-edit-outline',
          onPress: onEditCards,
        },
        b: undefined,
      });
      return;
    }

    // this is not good enough
    if (!isRootless) {
      setButtons({
        a: {
          icon: 'plus',
          onPress: () => {
            if (!navigation) {
              console.log('No');
              return;
            }
            if (type === ObjType.Card) {
              navigation.navigate('Card', {id: NEW_ID, mode: CRUDMode.Create});
            }
            if (type === ObjType.Tag) {
              navigation.navigate('Tag', {id: NEW_ID, mode: CRUDMode.Create});
            }
          },
        },
        b: {
          icon: 'school-outline',
          onPress: () => {
            if (!navigation) {
              return;
            }
            navigation.navigate('Test', {tagIds: [], cardIds: [], type: type});
          },
        },
      });
    }
  };

  const setMultiSelectButtons = () => {
    if (isRootless) {
      setToggledButtons({
        a: {
          icon: 'check',
          onPress: onSelectMany,
        },
      });
      return; // NOTE this return!
    }
    let testMany: FABProps | undefined;
    let tagMany: FABProps | undefined;
    let browseMany: FABProps | undefined;
    let dangerButton: FABProps | undefined;

    if (onTestMany && isTestVisible()) {
      testMany = {
        icon: 'school-outline',
        onPress: () => onTestMany(type),
      };
    }

    if (onBrowseMany) {
      browseMany = {
        icon: 'card-search-outline',
        onPress: onBrowseMany,
      };
    }

    if (onTagMany) {
      tagMany = {
        icon: 'tag-plus-outline',
        onPress: onTagMany,
      };
    }

    if (onDeleteMany) {
      dangerButton = {
        icon: 'trash-can-outline',
        onPress: onDeleteMany,
      };
    }

    if (onUnTagMany) {
      dangerButton = {
        icon: 'tag-off-outline',
        onPress: onUnTagMany,
      };
    }

    setToggledButtons({
      b: testMany,
      c: browseMany,
      d: tagMany,
    });

    setToggledDangerButtons({
      a: dangerButton,
    });
  };

  const isTestVisible = () => {
    if (type === ObjType.Card) {
      return selectedIds.length > 1;
    }
    return selectedIds.length > 0;
  };

  return (
    <ActionsBar
      buttons={buttons}
      toggle={isMultiSelect}
      toggledButtons={toggledButtons}
      toggledDangerButtons={toggledDangerButtons}
    />
  );
}
