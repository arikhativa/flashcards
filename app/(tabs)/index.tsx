import { View, FlatList } from "react-native";
import { IconButton } from "react-native-paper";
import { CardTile } from "@/components/CardTile";
import { useStore } from "@/providers/GlobalStore";
import { Link } from "expo-router";
import { baseUnit } from "@/constants/styles";
import { container } from "../../constants/styles";
import { NEW_CARD_ID } from "../card/[id]";

export default function CardsScreen() {
  const { cards } = useStore();

  return (
    <View style={container.flex1}>
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
        href={{
          pathname: "/card/[id]",
          params: { id: NEW_CARD_ID },
        }}
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
