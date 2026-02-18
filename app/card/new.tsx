import CardForm from '@/components/card/CardForm';
import { useNavigation } from 'expo-router';
import { View } from 'react-native';
import { useEffect } from 'react';

export default function CardDetailed() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: 'New Card' });
  }, [navigation]);

  return (
    <View className="flex-1">
      <CardForm />
    </View>
  );
}
