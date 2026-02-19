import BrowseManager from '@/components/test/BrowseManager';
import useCardList from '@/hooks/query/useCardList';

export default function TestCarousel() {
  const { data } = useCardList();
  if (data) {
    return <BrowseManager cards={data} />;
  }
}
