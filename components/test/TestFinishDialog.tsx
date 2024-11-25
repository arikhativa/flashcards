import { Card } from "@/types/Card";
import { FlatList, View } from "react-native";
import { Dialog, Portal, IconButton } from "react-native-paper";
import TestFinishRow from "./TestFinishRow";
import { CardMeta } from "@/types/TestSettings";
import { baseUnit, container, text } from "@/constants/styles";
import { KnowledgeLevel } from "@/types/KnowledgeLevel";

interface TestFinishDialogProps {
  scrollToPage: (index: number) => void;
  visible: boolean;
  cards: Card[];
  cardsMeta: CardMeta[];
  onChangeKnowledgeLevel: (index: number, newKL: KnowledgeLevel) => void;
  onDismiss: () => void;
}

export default function TestFinishDialog({
  scrollToPage,
  visible,
  cards,
  cardsMeta,
  onChangeKnowledgeLevel,
  onDismiss,
}: TestFinishDialogProps) {
  return (
    <Portal>
      {visible && (
        <View
          style={{
            flex: 1,
          }}
        >
          <Dialog visible={visible} onDismiss={onDismiss}>
            <Dialog.Title style={text.dialogTitle}>
              Adjust Knowledge Level
            </Dialog.Title>
            <IconButton
              style={container.buttonTopRight}
              icon="close"
              size={baseUnit * 2}
              onPress={onDismiss}
            ></IconButton>
            <Dialog.ScrollArea>
              <FlatList
                style={[{ height: "95%" }]}
                data={cards}
                keyExtractor={(card) => card.id.toString()}
                renderItem={({ item, index }) => (
                  <TestFinishRow
                    scrollToPage={(index: number) => {
                      onDismiss();
                      scrollToPage(index);
                    }}
                    index={index}
                    card={item}
                    cardMeta={cardsMeta[index]}
                    onChangeKnowledgeLevel={onChangeKnowledgeLevel}
                  />
                )}
              />
            </Dialog.ScrollArea>
          </Dialog>
        </View>
      )}
    </Portal>
  );
}
