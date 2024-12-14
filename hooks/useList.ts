import {useCallback, useState} from 'react';
import {BaseCrud} from '../types/generic';

export type List<T extends BaseCrud> = [
  list: T[],
  setList: React.Dispatch<React.SetStateAction<T[]>>,
  modifyList: (newItems: T[]) => void,
  filterList: (ids: T['id'][]) => void,
];

export function useList<T extends BaseCrud>(
  initialState: T[] | (() => T[]),
): List<T> {
  const [list, setList] = useState<T[]>(initialState);

  const modifyList = useCallback((newItems: T[]) => {
    setList(prev => {
      const newObjectMap = new Map(newItems.map(obj => [obj.id, obj]));
      const ids = newItems.map(obj => obj.id);

      const updatedIds: number[] = [];

      const ret = prev.map(item => {
        if (ids.includes(item.id)) {
          updatedIds.push(item.id);
          return newObjectMap.get(item.id);
        }
        return item;
      });

      const createdItems = newItems.filter(
        item => !updatedIds.includes(item.id),
      );
      return [...ret, ...createdItems];
    });
  }, []);

  const filterList = useCallback((ids: T['id'][]) => {
    setList(prev => prev.filter(item => !ids.includes(item.id)));
  }, []);

  return [list, setList, modifyList, filterList];
}
