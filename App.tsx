import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Repository} from 'typeorm';
import {CardSchema, ConfSchema, MetadataSchema, TagSchema} from './db/schemas';
import {AppDataSource} from './db/AppDataSource';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {DefaultTheme, PaperProvider, Text} from 'react-native-paper';
import {MD3Colors, MD3Theme} from 'react-native-paper/lib/typescript/types';
import {StoreProvider} from './providers/GlobalStore';

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
      <PaperProvider theme={theme}>
        <StoreProvider
          repos={{
            cardRepository,
            tagRepository,
            confRepository,
            metadataRepository,
          }}>
          <View>
            <Text>Het</Text>
          </View>
          {/* <Stack>
            <Stack.Screen name="(tabs)" options={{headerShown: false}} />
            <Stack.Screen name="+not-found" />
          </Stack> */}
        </StoreProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );

  // NOT me ...
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
