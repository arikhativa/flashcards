import { PaperProvider } from "react-native-paper";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { StoreProvider } from "@/providers/GlobalStore";
import { source } from "@/hooks/db";
import { CardSchema, ConfSchema, TagSchema } from "@/schemas/schemas";
import { Repository } from "typeorm";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
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
      const db = await source.initialize();
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
    <PaperProvider>
      <StoreProvider
        cardRepository={cardRepository}
        tagRepository={tagRepository}
        confRepository={confRepository}
      >
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </ThemeProvider>
      </StoreProvider>
    </PaperProvider>
  );
}
