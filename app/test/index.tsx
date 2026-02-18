import { Typography } from '@/components/ui/text';
import { useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';

export default function TestScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: 'Test Setup' });
  }, [navigation]);

  return (
    <View>
      <Typography>TestScreen</Typography>
    </View>
  );
}
