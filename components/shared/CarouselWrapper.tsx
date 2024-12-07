import * as React from 'react';
import {Dimensions, View} from 'react-native';
import Carousel, {
  CarouselRenderItem,
  ICarouselInstance,
} from 'react-native-reanimated-carousel';

import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';

// This is to remove a redundant warning the the carousel does in strict mode
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export interface CarouselWrapperRef {
  scrollToNextPage: () => void;
  scrollToPage: (index: number) => void;
  currentIndex: () => number;
}

interface CarouselProps {
  length: number;
  renderItem: CarouselRenderItem<number>;
}

const CarouselWrapper = React.forwardRef<CarouselWrapperRef, CarouselProps>(
  ({renderItem, length}, ref) => {
    const carouselRef = React.useRef<ICarouselInstance>(null);

    const [data, setData] = React.useState<number[]>([
      ...new Array(length + 1).keys(),
    ]);

    React.useEffect(() => {
      setData([...new Array(length + 1).keys()]);
    }, [length]);

    const scrollToNextPage = () => {
      if (carouselRef.current) {
        carouselRef.current.next();
      }
    };

    const scrollToPage = (index: number) => {
      if (carouselRef.current) {
        carouselRef.current.scrollTo({
          index,
          animated: true,
        });
      }
    };

    const currentIndex = () => {
      return carouselRef.current?.getCurrentIndex() || 0;
    };

    React.useImperativeHandle(ref, () => ({
      scrollToNextPage: scrollToNextPage,
      scrollToPage: scrollToPage,
      currentIndex: currentIndex,
    }));

    return (
      <Carousel
        loop={false}
        ref={carouselRef}
        width={width}
        height={height}
        data={data}
        renderItem={renderItem}
      />
    );
  },
);

CarouselWrapper.displayName = 'CarouselWrapper';

export default CarouselWrapper;
