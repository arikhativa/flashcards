import { useState, useEffect } from 'react';

export function useMultiSelect() {
  const [isMultiSelectOn, setIsMultiSelectOn] = useState(false);

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  useEffect(() => {
    setIsMultiSelectOn(selectedIds.length > 0);
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

  const isIdSelected = (id: number) => {
    return selectedIds.includes(id);
  };

  return {
    isIdSelected,
    isMultiSelectOn,
    selectedIds,
    // selectedIdsRef,
    toggleIdSelection,
    clearSelectedIds,
    setSelectedIds,
  };
}
