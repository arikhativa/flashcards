import Cards from "@/components/cards/Cards";
import { useMultiSelect } from "@/hooks/useMultiSelect";
import { useStore } from "@/providers/GlobalStore";

export default function IndexScreen() {
  const { cards, cardService, conf } = useStore();
  const multiSelect = useMultiSelect();

  return (
    <Cards
      cards={cards}
      cardService={cardService}
      conf={conf}
      multiSelect={multiSelect}
    />
  );
}
