import { useCallback, useState } from "react";
import { BaseCrud } from "../types/generic";

export type List<T extends BaseCrud> = [
  list: T[],
  setList: React.Dispatch<React.SetStateAction<T[]>>,
  modifyList: (newItems: T[]) => void,
  filterList: (ids: T["id"][]) => void
];

export function useList<T extends BaseCrud>(
  initialState: T[] | (() => T[])
): List<T> {
  const [list, setList] = useState<T[]>(initialState);

  const modifyList = useCallback((newItems: T[]) => {
    setList((prev) => {
      const newObjectMap = new Map(newItems.map((obj) => [obj.id, obj]));
      const ids = newItems.map((obj) => obj.id);

      return prev.map((item) =>
        ids.includes(item.id) ? { ...item, ...newObjectMap.get(item.id) } : item
      );
    });
  }, []);

  const filterList = useCallback((ids: T["id"][]) => {
    setList((prev) => prev.filter((item) => !ids.includes(item.id)));
  }, []);

  return [list, setList, modifyList, filterList];
}
