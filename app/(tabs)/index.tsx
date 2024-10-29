import { Image, StyleSheet, Platform } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEffect } from "react";
import { CardSchema } from "@/schemas/schemas";
import { source } from "@/hooks/db";
import { CardService } from "@/services/Card";
import { KnowledgeLevel } from "@/types/KnowledgeLevel";
import StoreService from "@/services/Store";

export default function HomeScreen() {
  useEffect(() => {
    const fetchData = async () => {
      const cs = StoreService.cardService;

      const card = await cs.getAll();
      console.log("cards", card);
    };

    fetchData();
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcosssme!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit{" "}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{" "}
          to see changes. Press{" "}
          <ThemedText type="defaultSemiBold">
            {Platform.select({ ios: "cmd + d", android: "cmd + m" })}
          </ThemedText>{" "}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this
          starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{" "}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText>{" "}
          to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{" "}
          directory. This will move the current{" "}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});

// useEffect(() => {
//   const fetchData = async () => {
//     const db = await SQLite.openDatabaseAsync("flashcards.db");

//     //   await db.execAsync(`
//     // PRAGMA journal_mode = WAL;
//     // CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY NOT NULL, value TEXT NOT NULL, intValue INTEGER);
//     // INSERT INTO test (value, intValue) VALUES ('test1', 123);
//     // INSERT INTO test (value, intValue) VALUES ('test2', 456);
//     // INSERT INTO test (value, intValue) VALUES ('test3', 789);
//     // `);

//     // `runAsync()` is useful when you want to execute some write operations.
//     const result = await db.runAsync(
//       "INSERT INTO test (value, intValue) VALUES (?, ?)",
//       "aaa",
//       100
//     );
//     console.log(result.lastInsertRowId, result.changes);
//     await db.runAsync(
//       "UPDATE test SET intValue = ? WHERE value = ?",
//       999,
//       "aaa"
//     ); // Binding unnamed parameters from variadic arguments
//     await db.runAsync("UPDATE test SET intValue = ? WHERE value = ?", [
//       999,
//       "aaa",
//     ]); // Binding unnamed parameters from array
//     await db.runAsync("DELETE FROM test WHERE value = $value", {
//       $value: "aaa",
//     }); // Binding named parameters from object

//     // `getFirstAsync()` is useful when you want to get a single row from the database.
//     const firstRow: any = await db.getFirstAsync("SELECT * FROM test");
//     console.log(firstRow.id, firstRow.value, firstRow.intValue);

//     // `getAllAsync()` is useful when you want to get all results as an array of objects.
//     const allRows: any = await db.getAllAsync("SELECT * FROM test");
//     for (const row of allRows) {
//       console.log(row.id, row.value, row.intValue);
//     }

//     // `getEachAsync()` is useful when you want to iterate SQLite query cursor.
//     for await (const a of db.getEachAsync("SELECT * FROM test")) {
//       const row = a as any;
//       console.log(row.id, row.value, row.intValue);
//     }
//   };

//   fetchData();
// }, []);
