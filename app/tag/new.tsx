import { useNavigation } from 'expo-router';
import { View } from 'react-native';
import { useEffect } from 'react';
import TagForm from '@/components/tag/TagForm';

export default function TagNew() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: 'New Tag' });
  }, [navigation]);

  return (
    <View className="flex-1">
      <TagForm />
    </View>
  );
}
