import React, {useEffect, useLayoutEffect} from 'react';
import {useLocalSearchParams, useNavigation} from 'expo-router';
import TagComponent from '../components/tag/Tag';
import {ComponentProps, CRUDMode, NEW_ID, ObjType} from '../types/generic';
import CardComponent from '../components/card/Card';
import NotFoundScreen from './+not-found';
import {ObjLinkProps} from '../utils/links';
import {Tag} from '../types/Tag';
import {Card} from '../types/Card';
import {rawStringArrayToIntArray} from '../utils/generic';

const ObjPage: React.FC = () => {
  const {id, mode, objType, rawIds} =
    useLocalSearchParams<ObjLinkProps>() as unknown as ObjLinkProps;
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    if (!id) {
      console.error('Bad Card ID');
      return;
    }
  }, []);

  const getGenericComponent = <T,>(
    component: React.FC<ComponentProps<T>>,
    data?: T,
  ) => {
    if (id === NEW_ID) {
      return React.createElement(component, {
        data: data,
        mode: CRUDMode.Create,
      });
    }
    if (mode && mode === CRUDMode.Read) {
      return React.createElement(component, {
        mode: CRUDMode.Read,
        id: id,
      });
    }
    return React.createElement(component, {
      mode: CRUDMode.Update,
      id: id,
    });
  };

  const getComponent = () => {
    if (objType === ObjType.Tag) {
      if (rawIds) {
        const idsList = rawStringArrayToIntArray(rawIds);

        if (idsList.length) {
          const data: Tag = {
            cards: idsList as unknown as Card[],
          } as Tag;

          return getGenericComponent(TagComponent, data);
        }
      }
      return getGenericComponent(TagComponent);
    } else if (objType === ObjType.Card) {
      return getGenericComponent(CardComponent);
    }
    return <NotFoundScreen />;
  };

  return getComponent();
};

export default ObjPage;
