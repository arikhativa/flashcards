import {CRUDMode, ObjType} from '../types/generic';
import {toStringIds} from './generic';

export function getTagHref(
  id: string | number,
  mode?: CRUDMode,
  cardIds?: number[],
) {
  return {
    pathname: '/[objType]',
    params: {
      objType: ObjType.Tag,
      id,
      mode,
      rawIds: cardIds ? toStringIds(cardIds) : '',
    },
  };
}

export function getTestHref(
  selectedIds?: number[],
  type: ObjType = ObjType.Card,
) {
  const prop: TestLinkProps = {
    rawIds: (selectedIds ? toStringIds(selectedIds) : []) as unknown as string,
    type,
  };

  return {
    pathname: '/TestPage',
    params: prop,
  };
}

export function getBrowseHref(selectedIds?: number[]) {
  const prop: any = {
    rawIds: (selectedIds ? toStringIds(selectedIds) : []) as unknown as string,
  };

  return {
    pathname: '/BrowsePage',
    params: prop,
  };
}

export function goToCard() {
  return {
    pathname: '/',
  };
}
