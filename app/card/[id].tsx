import { Card } from "@/types/Card";
import { Button, Text } from "react-native-paper";
import { Card as PaperCard } from "react-native-paper";
import { Divider } from "react-native-paper";
import { baseUnit } from "@/constants/styles";
import { useEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";

interface CardComponentProps {}

const CardComponent: React.FC<CardComponentProps> = () => {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    if (id) {
      navigation.setOptions({ title: `Card ${id}` });
    }
  }, [id, navigation]);

  return (
    <PaperCard style={{ margin: baseUnit }}>
      <PaperCard.Content>
        <Text variant="titleSmall">this is card</Text>
      </PaperCard.Content>
    </PaperCard>
  );
};

export default CardComponent;
