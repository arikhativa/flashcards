import React from 'react';
import {flex, gap, margin, position} from '../../constants/styles';
import {View} from 'react-native';
import FABWrapper from './FABWrapper';

export interface FABProps {
  icon: string;
  onPress?: () => void;
}

export interface MainButtons {
  a?: FABProps;
  b?: FABProps;
  c?: FABProps;
  d?: FABProps;
}

export interface DangerButtons {
  a?: FABProps;
  b?: FABProps;
}

interface ActionsBarProps {
  buttons?: MainButtons;
  toggle?: boolean;
  toggledButtons?: MainButtons;
  dangerButtons?: DangerButtons;
  toggledDangerButtons?: DangerButtons;
  isDisabled?: (index: number) => boolean;
}

export default function ActionsBar({
  buttons,
  toggle,
  toggledButtons,
  dangerButtons,
  toggledDangerButtons,
  isDisabled,
}: ActionsBarProps) {
  const getIcon = (index: number): string => {
    const entry = indexToMainEntry(index);
    if (toggledButtons && toggle) {
      if (toggledButtons[entry]) {
        return toggledButtons[entry].icon;
      }
    }
    if (buttons && buttons[entry]) {
      return buttons[entry].icon;
    }
    return '';
  };

  const handleOnPress = (index: number) => {
    const entry = indexToMainEntry(index);
    if (toggledButtons && toggle) {
      if (toggledButtons[entry] && toggledButtons[entry].onPress) {
        return toggledButtons[entry].onPress;
      }
    }
    if (buttons && buttons[entry] && buttons[entry].onPress) {
      return buttons[entry].onPress;
    }
  };

  const getVisibility = (index: number): boolean => {
    const entry = indexToMainEntry(index);
    if (toggledButtons && toggle) {
      if (isVisible(toggledButtons[entry])) {
        return true;
      }
    }
    if (!toggle && isVisible(buttons && buttons[entry])) {
      return true;
    }
    return false;
  };

  const getDangerIcon = (index: number): string => {
    const entry = indexToDangerEntry(index);
    if (toggledDangerButtons && toggle) {
      if (toggledDangerButtons[entry]) {
        return toggledDangerButtons[entry].icon;
      }
    }
    if (dangerButtons && dangerButtons[entry]) {
      return dangerButtons[entry].icon;
    }
    return '';
  };

  const handleDangerOnPress = (index: number) => {
    const entry = indexToDangerEntry(index);
    if (toggledDangerButtons && toggle) {
      if (toggledDangerButtons[entry] && toggledDangerButtons[entry].onPress) {
        return toggledDangerButtons[entry].onPress;
      }
    }
    if (dangerButtons && dangerButtons[entry] && dangerButtons[entry].onPress) {
      return dangerButtons[entry].onPress;
    }
  };

  const getDangerVisibility = (index: number): boolean => {
    const entry = indexToDangerEntry(index);
    if (toggledDangerButtons && toggle) {
      if (isVisible(toggledDangerButtons[entry])) {
        return true;
      }
    }
    if (!toggle && dangerButtons && isVisible(dangerButtons[entry])) {
      return true;
    }
    return false;
  };

  const isVisible = (p?: FABProps) => {
    return p && p.onPress !== undefined && p.icon !== undefined;
  };

  const getButtons = () => {
    const list: React.JSX.Element[] = [];
    for (let i = 0; i < 4; i++) {
      list.push(
        <FABWrapper
          visible={getVisibility(i)}
          key={i}
          disabled={isDisabled ? isDisabled(i) : false}
          icon={getIcon(i)}
          onPress={handleOnPress(i)}
        />,
      );
    }
    return list;
  };

  const getDangerButtons = () => {
    const list: React.JSX.Element[] = [];
    for (let i = 0; i < 2; i++) {
      list.push(
        <FABWrapper
          size="small"
          variant="tertiary"
          visible={getDangerVisibility(i)}
          key={i}
          disabled={isDisabled ? isDisabled(i) : false}
          icon={getDangerIcon(i)}
          onPress={handleDangerOnPress(i)}
        />,
      );
    }
    return (
      <View
        style={[
          margin.base2,
          margin.top5,
          position.absolute,
          position.top0,
          position.right0,
        ]}
      >
        {list}
      </View>
    );
  };

  return (
    <>
      {getDangerButtons()}

      <View
        style={[
          margin.base4,
          position.absolute,
          flex.alignSelfCenter,
          flex.f1,
          position.bottom0,
          flex.rowReverse,
          gap.base6,
        ]}
      >
        {getButtons()}
      </View>
    </>
  );
}

function indexToMainEntry(index: number): keyof MainButtons {
  switch (index) {
    case 0:
      return 'a';
    case 1:
      return 'b';
    case 2:
      return 'c';
    case 3:
      return 'd';
    default:
      return 'a';
  }
}

function indexToDangerEntry(index: number): keyof DangerButtons {
  switch (index) {
    case 0:
      return 'a';
    case 1:
      return 'b';
    default:
      return 'a';
  }
}
