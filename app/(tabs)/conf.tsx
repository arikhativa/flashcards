import { Button, View, TextInput, Text, StyleSheet } from "react-native";

import { useEffect, useState } from "react";
import { Conf } from "@/types/Conf";
import { useStore } from "@/providers/GlobalStore";

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
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Side A"
        value={localConf.sideA}
        onChangeText={(text) => handleInputChange("sideA", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Side B"
        value={localConf.sideB}
        onChangeText={(text) => handleInputChange("sideB", text)}
      />
      <Text>{localConf.updatedAt.toString()}</Text>
      <Button title="Save" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});
