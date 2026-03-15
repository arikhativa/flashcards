import MainScreen from '@/components/MainScreen';
import { Separator } from '@/components/ui/separator';
import { Typography } from '@/components/ui/text';
import { useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';

export default function TestSummaryScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <MainScreen>
      <View>
        <Typography variant={'h1'}>Text is done!</Typography>
        <Typography variant={'h2'}>You got X/Y</Typography>
      </View>
      <View>
        <Typography>Adjust Knowledge Level</Typography>
        <Separator />
      </View>
    </MainScreen>
  );
}
