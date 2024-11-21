import {
  useState,
  Dispatch,
  SetStateAction,
  useRef,
  MutableRefObject,
  useEffect,
} from "react";

export function useStateDirty<T>(
  init: T | (() => T)
): [T, Dispatch<SetStateAction<T>>, MutableRefObject<boolean>, () => void] {
  const [state, setState] = useState(init);
  const [isDirty, setIsDirty] = useState(false);
  const isDirtyRef = useRef(isDirty);

  useEffect(() => {
    isDirtyRef.current = isDirty;
  }, [isDirty]);

  const wrappedSetter: Dispatch<SetStateAction<T>> = (value) => {
    setIsDirty(true);
    setState(value);
  };

  const reset = () => {
    setIsDirty(false);
  };

  return [state, wrappedSetter, isDirtyRef, reset];
}
