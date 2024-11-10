import { DefaultTheme, PaperProvider } from "react-native-paper";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { StoreProvider } from "@/providers/GlobalStore";
import { source } from "@/hooks/db";
import { CardSchema, ConfSchema, TagSchema } from "@/schemas/schemas";
import { DataSource, Repository } from "typeorm";

import { en, registerTranslation } from "react-native-paper-dates";
registerTranslation("en", en);

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const theme = {
  ...DefaultTheme,
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
          db = await source.initialize();
        } else {
          db = source;
        }
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
  );
}
