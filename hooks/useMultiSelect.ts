import {useState, useEffect, useRef} from 'react';

export interface MultiSelect {
  isMultiSelect: boolean;
  selectedIds: number[];
  selectedIdsRef: React.MutableRefObject<number[]>;
  toggleIdSelection: (id: number) => void;
  clearSelectedIds: () => void;
  setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>;
}

export function useMultiSelect(): MultiSelect {
  const [isMultiSelect, setIsMultiSelect] = useState(false);

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
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const clearSelectedIds = () => {
    setSelectedIds([]);
  };

  return {
    isMultiSelect,
    selectedIds,
    selectedIdsRef,
    toggleIdSelection,
    clearSelectedIds,
    setSelectedIds,
  };
}
