import { Redirect, useLocalSearchParams, useNavigation } from 'expo-router';
import * as z from 'zod';
import { View } from 'react-native';
import { Typography } from '@/components/ui/text';
import { useEffect } from 'react';
import useTag from '@/hooks/query/useTag';
import TagForm from '@/components/tag/TagForm';
import { BAD_ID } from '@/lib/constants';

const schema = z.object({
  id: z.string().transform(Number).pipe(z.number().int().positive()),
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

  const q = useTag(success ? data.id : BAD_ID);

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
      <Typography>Loading</Typography>
    </View>
  );
}
