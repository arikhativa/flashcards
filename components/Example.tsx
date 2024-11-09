import { StyleSheet, View } from "react-native";

interface ExampleProps {}

export default function Example({}: ExampleProps) {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {},
});
