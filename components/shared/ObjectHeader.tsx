import {Appbar} from 'react-native-paper';
import ObjectMenu from './ObjectMenu';
import {useMenu} from '../../hooks/useMenu';
import {PropsWithChildren} from 'react';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

type ObjectHeaderProps = PropsWithChildren<{
  title: string;
  onDelete: () => void;
  deleteMessage: string;
}>;

export default function ObjectHeader({
  children,
  title,
  onDelete,
  deleteMessage,
}: ObjectHeaderProps) {
  const navigation = useNavigation();
  const {visible, openMenu, closeMenu} = useMenu();

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title={title} />
        <ObjectMenu
          anchor={<Appbar.Action icon="dots-vertical" onPress={openMenu} />}
          visible={visible}
          closeMenu={closeMenu}
          onDelete={() => {
            onDelete();
          }}
          deleteMessage={deleteMessage}
        />
      </Appbar.Header>
      {children}
    </>
  );
}
