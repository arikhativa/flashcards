import { View } from "react-native";
import { FAB, IconButton } from "react-native-paper";
import { useStore } from "@/providers/GlobalStore";
import { Link } from "expo-router";
import { baseUnit, margin } from "@/constants/styles";
import { container } from "../../constants/styles";
import { getCardHref } from "@/utils/links";
import { NEW_ID } from "../[objType]";
import { CardManyTiles } from "@/components/CardManyTiles";

export default function CardsScreen() {
  const { cards } = useStore();

  return (
    <View style={[container.flex1, margin.top2]}>
      <CardManyTiles cards={cards} />
      <Link
        style={container.buttonBottomRight}
        href={getCardHref(NEW_ID)}
        asChild
      >
        <FAB icon="plus" />
      </Link>
    </View>
  );
}
