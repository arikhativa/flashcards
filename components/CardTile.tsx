import { Card } from "@/types/Card";
import { Chip, IconButton, Text } from "react-native-paper";
import { Card as PaperCard } from "react-native-paper";
import { Divider } from "react-native-paper";
import { color, container, margin } from "@/constants/styles";
import { Link } from "expo-router";
import { Pressable, View } from "react-native";
import { getCardHref } from "@/utils/links";
import {
  GestureHandlerRootView,
  HandlerStateChangeEvent,
  LongPressGestureHandler,
  State,
  TapGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import { useState } from "react";

export type CardTileProps = {
  card: Card;
  disabledLink?: boolean;
  onClose?: () => void;
};

export function CardTile({ card, disabledLink, onClose }: CardTileProps) {
  const [isSelected, setIsSelected] = useState(false);

  const handleLongPress = (
    event: HandlerStateChangeEvent<TapGestureHandlerEventPayload>
  ) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      setIsSelected(!isSelected);
    }
  };

  const getSelectedStyle = () => {
    return isSelected ? color.bgPink : {}; // TODO better style
  };

  return (
    <GestureHandlerRootView style={{ backgroundColor: "transparent" }}>
      <LongPressGestureHandler
        onHandlerStateChange={handleLongPress}
        minDurationMs={800}
      >
        <Link disabled={disabledLink} href={getCardHref(card.id)} asChild>
          <Pressable>
            <View>
              {onClose && (
                <IconButton
                  style={{
                    padding: 0,
                    position: "absolute",
                    top: -5,
                    right: -10,
                    zIndex: 5,
                  }}
                  icon="close"
                  size={15}
                  mode="contained"
                  onPress={onClose}
                ></IconButton>
              )}

              <PaperCard style={[margin.base, getSelectedStyle()]}>
                <PaperCard.Content>
                  <Text variant="titleSmall">{card.sideA}</Text>
                  <Divider></Divider>
                  <Text variant="titleSmall">{card.sideB}</Text>
                </PaperCard.Content>
              </PaperCard>
            </View>
          </Pressable>
        </Link>
      </LongPressGestureHandler>
    </GestureHandlerRootView>
  );
}
