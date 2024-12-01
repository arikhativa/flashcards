import {Href, RouteParamInput, useRouter} from 'expo-router';
import {getTestHref, ObjLinkProps, TestLinkProps} from '../utils/links';
import {useEffect, useState} from 'react';
import ActionsBar, {DangerButtons, MainButtons} from './ActionsBar';
import {ObjType} from '../types/generic';

interface FABProps {
  icon: string;
  onPress?: () => void;
  href?: Href<RouteParamInput<ObjLinkProps | TestLinkProps>>;
}

interface MultiSelectActionBarProps {
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
  href?: Href<ObjLinkProps | TestLinkProps>;
  isRootless?: boolean;
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
  href,
  onTestMany,
}: MultiSelectActionBarProps) {
  const router = useRouter();
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
      });
    }

    if (href) {
      setButtons({
        a: {
          icon: 'plus',
          onPress: () => {
            router.push(href);
          },
        },
        b: {
          icon: 'school-outline',
          onPress: () => {
            router.push(getTestHref());
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
