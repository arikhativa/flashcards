import { Tag } from '@/db/schema';
import { useRouter } from 'expo-router';
import TagFlashList from '@/components/tag/TagFlashList';

interface Props {
  list: Tag[];
}

export default function TagTileList({ list }: Props) {
  const router = useRouter();

  return (
    <TagFlashList
      tags={list}
      onPress={(item) =>
        router.navigate({
          pathname: '/tag/[id]',
          params: { id: item.id },
        })
      }
    />
  );
}
