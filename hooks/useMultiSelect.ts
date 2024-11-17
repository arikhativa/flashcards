import { ObjType } from "@/types/generic";
import { getTestHref } from "@/utils/links";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";

export function useMultiSelect() {
  const [isMultiSelect, setIsMultiSelect] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const router = useRouter();

  useEffect(() => {
    setIsMultiSelect(selectedIds.length > 0);
  }, [selectedIds]);

  const toggleIdSelection = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const clearSelectedIds = () => {
    setSelectedIds([]);
  };

  const handelTestMany = (list: number[], type: ObjType = ObjType.Card) => {
    router.push(getTestHref(list, type));
    clearSelectedIds();
  };

  return {
    isMultiSelect,
    selectedIds,
    toggleIdSelection,
    clearSelectedIds,
    handelTestMany,
  };
}
