import { DefaultTheme, PaperProvider, MD3Theme } from "react-native-paper";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { StoreProvider } from "@/providers/GlobalStore";
import { source } from "@/db/db";
import { CardSchema, ConfSchema, TagSchema } from "@/schemas/schemas";
import { DataSource, Repository } from "typeorm";

import { en, registerTranslation } from "react-native-paper-dates";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MD3Colors } from "react-native-paper/lib/typescript/types";
registerTranslation("en", en);

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export type CustomColors = MD3Colors & {
  successContainer: string;
  success: string;
};
export type CustomTheme = MD3Theme & {
  colors: CustomColors;
};

const theme: CustomTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    successContainer: "#b5fc97", // TODO these are bad
    success: "#81c784",
  },
};

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [dbInitialized, setDbInitialized] = useState(false);

  const [cardRepository, setCardRepository] = useState<Repository<CardSchema>>(
    {} as Repository<CardSchema>
  );

  const [tagRepository, setTagRepository] = useState<Repository<TagSchema>>(
    {} as Repository<TagSchema>
  );

  const [confRepository, setConfRepository] = useState<Repository<ConfSchema>>(
    {} as Repository<ConfSchema>
  );

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    const initDB = async () => {
      let db: DataSource;
      try {
        if (!source.isInitialized) {
          console.log("init DB");
          db = await source.initialize();
        } else {
          console.log("DB already initialized");
          db = source;
        }
        console.log("run migrations");
        await source.runMigrations();
      } catch (e) {
        console.error("Error initializing database", e);
        return;
      }
      setCardRepository(db.getRepository(CardSchema));
      setTagRepository(db.getRepository(TagSchema));
      setConfRepository(db.getRepository(ConfSchema));
      setDbInitialized(true);
    };

    initDB();
  }, []);

  if (!loaded || !dbInitialized) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={theme}>
        <StoreProvider
          cardRepository={cardRepository}
          tagRepository={tagRepository}
          confRepository={confRepository}
        >
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </StoreProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
