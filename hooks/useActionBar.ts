import { FABProps } from "@/components/shared/ActionsBar";
import { useState } from "react";

export function useActionBar() {
  const [buttons, setButtons] = useState<FABProps[]>([]);
  const [toggledButtons, setToggledButtons] = useState<FABProps[]>([]);
  return { buttons, setButtons, toggledButtons, setToggledButtons };
}
