import { Card } from '@/db/schema';
import CardTile from '@/components/card/CardTile';
import { FlashList } from '@shopify/flash-list';

interface Props {
  cardList: Card[];
}

export default function CardTileList({ cardList }: Props) {
  return (
    <FlashList
      horizontal={false}
      numColumns={3}
      className="bg-blue-200"
      renderItem={({ item }) => {
        return <CardTile className={'m-3'} card={item} />;
      }}
      data={cardList}
    />
  );
}
