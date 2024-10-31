import { useEffect, useState } from "react";
import { Conf } from "@/types/Conf";
import { useStore } from "@/providers/GlobalStore";

import { Button, Card, Text } from "react-native-paper";
import { TextInput } from "react-native-paper";
import { View } from "react-native";

export default function ConfScreen() {
  const { conf, confService } = useStore();

  const [localConf, setLocalConf] = useState<Conf>(conf);

  useEffect(() => {
    setLocalConf(conf);
  }, [conf]);

  const handleSubmit = async () => {
    await confService.update(localConf);
  };

  const handleInputChange = (field: keyof Conf, value: string) => {
    setLocalConf({ ...localConf, [field]: value });
  };

  return (
    <View
      style={{
        display: "flex",
        height: "100%",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <Card>
        <Card.Title title="Settings" />
        <Card.Content>
          <Text variant="titleLarge">Names on Cards</Text>
          <TextInput
            label="Side A"
            value={localConf.sideA}
            onChangeText={(text) => handleInputChange("sideA", text)}
          />
          <TextInput
            label="Side B"
            value={localConf.sideB}
            onChangeText={(text) => handleInputChange("sideB", text)}
          />
        </Card.Content>
        <Card.Actions>
          <Button onPress={handleSubmit}>Ok</Button>
        </Card.Actions>
      </Card>
    </View>
  );
}
