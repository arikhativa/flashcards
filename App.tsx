import 'reflect-metadata'; // NOTE - this must be at the top of the app

import React, {useEffect, useState} from 'react';
import {Repository} from 'typeorm';
import {
  CardSchema,
  ConfSchema,
  MetadataSchema,
  TagSchema,
} from './schemas/schemas';
import {AppDataSource} from './db/AppDataSource';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {DefaultTheme, PaperProvider} from 'react-native-paper';
import {MD3Colors, MD3Theme} from 'react-native-paper/lib/typescript/types';
import {StoreProvider} from './providers/GlobalStore';
import {NavigationContainer} from '@react-navigation/native';
import IndexScreen from './app/(tabs)';
import {createStackNavigator} from '@react-navigation/stack';

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

const Stack = createStackNavigator();

function App(): React.JSX.Element {
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

  if (!dbInitialized) {
    return <></>;
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <StoreProvider
        repos={{
          cardRepository,
          tagRepository,
          confRepository,
          metadataRepository,
        }}>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Cards" id={undefined}>
              <Stack.Screen name="Cards" component={IndexScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </StoreProvider>
    </GestureHandlerRootView>
  );
}

export default App;
