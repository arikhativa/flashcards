import { useLocalSearchParams } from 'expo-router';

import { View, Text } from 'react-native';

export default function CardDetailed() {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>Card ID: {id}</Text>
    </View>
  );
}
