import { ObjType } from "@/types/generic";
import { getTestHref } from "@/utils/links";
import { useRouter } from "expo-router";
import { useState, useEffect, useRef } from "react";

export function useMultiSelect() {
  const [isMultiSelect, setIsMultiSelect] = useState(false);
  const router = useRouter();

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const selectedIdsRef = useRef<number[]>(selectedIds);

  useEffect(() => {
    selectedIdsRef.current = selectedIds;
  }, [selectedIds]);

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

  const handelTestMany = (type: ObjType = ObjType.Card) => {
    router.push(getTestHref(selectedIdsRef.current, type));
    clearSelectedIds();
  };

  return {
    isMultiSelect,
    selectedIds,
    selectedIdsRef,
    toggleIdSelection,
    clearSelectedIds,
    handelTestMany,
  };
}
