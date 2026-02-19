import CardSides from '@/components/card/CardSides';
import { Typography } from '@/components/ui/text';
import { Card } from '@/db/schema';
import { View } from 'react-native';

interface Props {
  card: Card;
  index: number;
  length: number;
}
function CardBrowse({ card, index, length }: Props) {
  // const { keyboardHeight } = useStore();
  // const containerHeight = Dimensions.get('window').height - keyboardHeight;
  // const cardHeight = containerHeight / 4;
  // const paddingHeight = containerHeight / 60;
  // const paddingStyle = { paddingVertical: paddingHeight };

  return (
    <View>
      {/* <View style={{ height: containerHeight }}> */}
      <CardSides
        disabled
        // cardHeight={cardHeight}
        // style={margin.x2}
        knowledgeLevel={card.knowledgeLevel}
        sideA={card.sideA}
        sideB={card.sideB}
      />

      {/* {card.comment && <CardComment disabled style={[margin.base2]} value={card.comment} />} */}
    </View>
  );
}

export default CardBrowse;
