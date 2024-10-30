import { Button, View, TextInput, Text, StyleSheet } from "react-native";

import { useEffect, useState } from "react";
import { useStore } from "@/context/StoreContext";
import { Conf } from "@/types/Conf";

export default function ConfScreen() {
  const store = useStore();
  const confService = store.confService;

  const [conf, setConf] = useState<Conf>(confService.empty);

  useEffect(() => {
    const loadConf = async () => {
      try {
        setConf(await confService.get());
      } catch (error) {
        console.error("Error fetching configuration:", error);
      }
    };

    loadConf();
  }, []);

  const handleSubmit = async () => {
    await confService.update(conf);
    const updatedConf = await confService.get();
    setConf(updatedConf);
    store.conf = updatedConf;
  };

  const handleInputChange = (field: keyof Conf, value: string) => {
    setConf({ ...conf, [field]: value });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Side A"
        value={conf.sideA}
        onChangeText={(text) => handleInputChange("sideA", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Side B"
        value={conf.sideB}
        onChangeText={(text) => handleInputChange("sideB", text)}
      />
      <Text>{conf.updatedAt.toString()}</Text>
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
