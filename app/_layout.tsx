import {DefaultTheme, PaperProvider, MD3Theme} from 'react-native-paper';
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect, useState} from 'react';
import 'react-native-reanimated';

import {StoreProvider} from '../providers/GlobalStore';
import {AppDataSource} from '../db/AppDataSource';
import {
  CardSchema,
  ConfSchema,
  MetadataSchema,
  TagSchema,
} from '../schemas/schemas';
import {Repository} from 'typeorm';

import {en, registerTranslation} from 'react-native-paper-dates';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
registerTranslation('en', en);

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
    successContainer: '#b5fc97', // TODO these are bad
    success: '#81c784',
  },
};

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [dbInitialized, setDbInitialized] = useState(false);

  const [cardRepository, setCardRepository] = useState<Repository<CardSchema>>(
    {} as Repository<CardSchema>,
  );

  const [tagRepository, setTagRepository] = useState<Repository<TagSchema>>(
    {} as Repository<TagSchema>,
  );

  const [confRepository, setConfRepository] = useState<Repository<ConfSchema>>(
    {} as Repository<ConfSchema>,
  );

  const [metadataRepository, setMetadataRepository] = useState<
    Repository<MetadataSchema>
  >({} as Repository<MetadataSchema>);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    const initDB = async () => {
      try {
        if (!AppDataSource.isInitialized) {
          console.log('init DB');
          await AppDataSource.initialize();
        } else {
          console.log('DB already initialized');
        }
        console.log('run migrations');
        await AppDataSource.runMigrations();
      } catch (e) {
        console.error('Error initializing database', e);
        return;
      }
      setCardRepository(AppDataSource.getRepository(CardSchema));
      setTagRepository(AppDataSource.getRepository(TagSchema));
      setConfRepository(AppDataSource.getRepository(ConfSchema));
      setMetadataRepository(AppDataSource.getRepository(MetadataSchema));
      setDbInitialized(true);
    };

    initDB();
  }, []);

  if (!loaded || !dbInitialized) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <PaperProvider theme={theme}>
        <StoreProvider
          repos={{
            cardRepository,
            tagRepository,
            confRepository,
            metadataRepository,
          }}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{headerShown: false}} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </StoreProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
