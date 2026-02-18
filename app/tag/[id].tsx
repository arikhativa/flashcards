import CardForm from '@/components/card/CardForm';
import useCard from '@/hooks/query/useCard';
import { Redirect, useLocalSearchParams, useNavigation } from 'expo-router';
import * as z from 'zod';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { useEffect } from 'react';
import useTag from '@/hooks/query/useTag';

const schema = z.object({
  id: z.string(),
});

export default function TagDetailed() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const { error, success, data } = schema.safeParse({ id });

  useEffect(() => {
    if (success) {
      navigation.setOptions({ title: 'Tag #' + id });
    }
  }, [success, navigation, id]);

  const q = useTag(success ? data.id : '');

  if (!success) {
    console.error('TagDetailed: bad id: ', error);
    return <Redirect href="/+not-found" />;
  }

  if (!q.data && q.isFetched) {
    console.error('TagDetailed: no data');
    return <Redirect href="/+not-found" />;
  }

  if (q.data) {
    return (
      <View className="flex-1">
        <TagForm current={q.data} />
      </View>
    );
  }

  return (
    <View className="flex-1">
      <Text>Loading</Text>
    </View>
  );
}
