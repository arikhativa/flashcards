import { View, FlatList } from "react-native";
import { IconButton } from "react-native-paper";
import { CardTile } from "@/components/CardTile";
import { useStore } from "@/providers/GlobalStore";
import { Link } from "expo-router";
import { baseUnit, margin } from "@/constants/styles";
import { container } from "../../constants/styles";
import { getCardHref } from "@/utils/links";
import { NEW_ID } from "../[objType]";

export default function CardsScreen() {
  const { cards } = useStore();

  return (
    <View style={[container.flex1, margin.top2]}>
      <View>
        <FlatList
          data={cards}
          keyExtractor={(card) => card.id.toString()}
          // TODO this 4 needs to be responsive
          numColumns={4}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
          renderItem={({ item }) => <CardTile card={item}></CardTile>}
        />
      </View>
      <Link
        style={container.buttonBottomRight}
        href={getCardHref(NEW_ID)}
        asChild
      >
        <IconButton
          icon="plus"
          size={baseUnit * 5}
          mode="contained"
        ></IconButton>
      </Link>
    </View>
  );
}
