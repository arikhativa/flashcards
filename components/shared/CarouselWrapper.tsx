import * as React from "react";
import { Dimensions, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  CarouselRenderItem,
  ICarouselInstance,
} from "react-native-reanimated-carousel";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

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
  ({ renderItem, length }, ref) => {
    const carouselRef = React.useRef<ICarouselInstance>(null);
    const progress = useSharedValue<number>(0);

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
      <View style={{ flex: 1 }}>
        <Carousel
          loop={false}
          ref={carouselRef}
          width={width}
          height={height}
          data={data}
          onProgressChange={(_, absoluteProgress) => {
            progress.value = absoluteProgress;
          }}
          renderItem={renderItem}
        />
      </View>
    );
  }
);

CarouselWrapper.displayName = "CarouselWrapper";

export default CarouselWrapper;
