import {
  useState,
  Dispatch,
  SetStateAction,
  useRef,
  MutableRefObject,
  useEffect,
} from "react";
import { useStateDirty } from "./useStateDirty";
import { CRUDMode } from "@/types/generic";

export function useCRUD<T>() {
  const [local, setLocal, isDirty, cleanDirt] = useStateDirty<T>({} as T);
  const [title, setTitle] = useState("");

  const localRef = useRef(local);

  useEffect(() => {
    localRef.current = local;
  }, [local]);

  const onUnmount = () => {
    if (isDirty.current) handleSubmit(cardLocalRef.current);
  };

  const onInit = (mode: CRUDMode, empty: T, createTitle: string, updateTitle:string, id: number) => {
    if (mode === CRUDMode.Create) {
      setTitle(createTitle);
      const create: T = empty;
      setLocal(create);
      cleanDirt();
      return onUnmount;
    }

    if (mode === CRUDMode.Update) {
      setTitle(updateTitle);

      if (id === BAD_ID) {
        console.error("CardComponent: invalid Card id, idLocal", id, idLocal);
        return;
      }

      const cardUpdate = cards.find((card) => card.id === idLocal);

      if (!cardUpdate) {
        console.error("CardComponent: Card not found");
        return;
      }
      setCardLocal(cardUpdate);
      cleanDirt();
      return onUnmount;
  }

  
  return;
}
