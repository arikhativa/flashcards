import CardForm from '@/components/card/CardForm';
import useCard from '@/hooks/query/useCard';
import { Redirect, useLocalSearchParams } from 'expo-router';
import * as z from 'zod';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';

const schema = z.object({
  id: z.string(),
});

export default function CardDetailed() {
  const { id } = useLocalSearchParams();

  const { error, success, data } = schema.safeParse({ id });

  const q = useCard(success ? data.id : '');

  if (!success) {
    console.error('CardDetailed: bad id: ', error);
    return <Redirect href="/+not-found" />;
  }

  if (!q.data && q.isFetched) {
    console.error('CardDetailed: no data');
    return <Redirect href="/+not-found" />;
  }

  if (q.data) {
    return (
      <View className="flex-1">
        <CardForm card={q.data} />
      </View>
    );
  }

  return (
    <View className="flex-1">
      <Text>Loading</Text>
    </View>
  );
}
