import React from 'react';
import {BAD_ID} from '../constants/general';
import {useStateDirty, UseStateDirtyArray} from '../hooks/useStateDirty';
import {BaseCrudService} from '../services/BaseCrud';
import {CRUDMode} from '../types/generic';
import {useNavigation} from 'expo-router';
import {PropsWithChildren, useEffect, useRef, useState} from 'react';
import {ObjectLiteral} from 'typeorm';
import ObjectHeader from './ObjectHeader';

type CRUDWrapperProps<T> = PropsWithChildren<{
  array: UseStateDirtyArray<T>;
  mode: CRUDMode;
  id: number;
  crudService: BaseCrudService<any, any, any, any>;
  newTitle: string;
  updateTitle: string;
  deleteMessage: string;
  empty: T;
  all: T[];
}>;

export default function CRUDWrapper<T extends ObjectLiteral>({
  array,
  all,
  id,
  newTitle,
  updateTitle,
  deleteMessage,
  mode,
  empty,
  crudService,
  children,
}: CRUDWrapperProps<T>) {
  const navigation = useNavigation();
  const [local, setLocal, isDirty, cleanDirt] = array;
  const [title, setTitle] = useState('');

  const localRef = useRef(local);

  useEffect(() => {
    localRef.current = local;
  }, [local]);

  const onUnmount = () => {
    if (isDirty.current) {
      handleSubmit(localRef.current);
    }
  };

  useEffect(() => {
    if (mode === CRUDMode.Create) {
      setTitle(newTitle);
      setLocal(empty);
      cleanDirt();
      return onUnmount;
    }

    if (mode === CRUDMode.Update) {
      setTitle(updateTitle);

      if (id === BAD_ID) {
        console.error('invalid id', id);
        return;
      }

      const update = all.find(e => e.id === id);

      if (!update) {
        console.error('object not found');
        return;
      }
      setLocal(update);
      cleanDirt();
      return onUnmount;
    }
  }, []);

  const handleSubmit = async (obj: T) => {
    if (mode === CRUDMode.Read) {
      return;
    }

    if (mode === CRUDMode.Create) {
      await handleSubmitCreate(obj);
      return;
    }

    if (mode === CRUDMode.Update) {
      await handleSubmitUpdate(obj);
      return;
    }
  };

  const handleSubmitCreate = async (obj: T) => {
    if (mode !== CRUDMode.Create) {
      return;
    }
    await crudService.create(obj);
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const handleSubmitUpdate = async (obj: T) => {
    if (!id || mode !== CRUDMode.Update) {
      return;
    }
    await crudService.update(id, obj);
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const handleSubmitDelete = async () => {
    if (!id || mode !== CRUDMode.Update) {
      return;
    }
    await crudService.delete(id);
    cleanDirt();
    navigation.goBack();
  };

  return (
    <ObjectHeader
      title={title}
      onDelete={handleSubmitDelete}
      deleteMessage={deleteMessage}>
      {children}
    </ObjectHeader>
  );
}
