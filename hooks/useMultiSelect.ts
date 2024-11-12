import { useState, useEffect } from "react";

export function useMultiSelect() {
  const [isMultiSelect, setIsMultiSelect] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

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

  return { isMultiSelect, selectedIds, toggleIdSelection, clearSelectedIds };
}
