import BottomSheet, { BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet';
import { forwardRef } from 'react';
import { View } from 'react-native';

interface Props {
  search?: string;
  onChangeText: ((text: string) => void) | undefined;
  children: React.ReactNode;
}

export const BottomSheetList = forwardRef<BottomSheet, Props>(
  ({ search, onChangeText, children }, ref) => {
    return (
      <BottomSheet
        index={-1}
        snapPoints={['90%']}
        ref={ref}
        enablePanDownToClose={true}
        backgroundStyle={{
          borderTopWidth: 0.5,
          borderWidth: 0.5,
          borderColor: 'var(--border-color)',
        }}>
        <BottomSheetView className="flex-1">
          <View className="px-4 py-2">
            <BottomSheetTextInput
              placeholder="Search..."
              value={search}
              onChangeText={onChangeText}
              autoCorrect={false}
              className="h-12 rounded-md border border-input bg-background px-3 py-2"
            />
          </View>
          {children}
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

BottomSheetList.displayName = 'BottomSheetList';
