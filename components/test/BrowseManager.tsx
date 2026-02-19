import CarouselWrapper, { CarouselWrapperRef } from '@/components/CarouselWrapper';
import CardBrowse from '@/components/test/CardBrowse';
import { Typography } from '@/components/ui/text';
import { Card } from '@/db/schema';
import { useRef } from 'react';
import { View } from 'react-native';

interface BrowseManagerProps {
  cards: Card[];
}

export default function BrowseManager({ cards }: BrowseManagerProps) {
  const carouselWrapperRef = useRef<CarouselWrapperRef>(null);

  const getPage = (index: number) => {
    if (!cards.length) {
      return <Typography>No Cards</Typography>; // TODO make this better
    }
    if (index === cards.length) {
      console.error('bad index', index, 'cards.length', cards.length);
      return null; // this
    }
    return <CardBrowse index={index} length={cards.length} card={cards[index]} />;
  };

  const renderItem = ({ index }: { index: number }) => {
    return <View className="flex-1 justify-center pt-3">{getPage(index)}</View>;
  };

  return (
    <View className="flex-1">
      <CarouselWrapper
        ref={carouselWrapperRef}
        length={cards.length ? cards.length - 1 : 0}
        renderItem={renderItem}
      />
    </View>
  );
}
