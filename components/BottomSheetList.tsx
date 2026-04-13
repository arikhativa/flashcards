import SearchInput from '@/components/form/SearchInput';
import { THEME } from '@/lib/theme';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { useColorScheme } from 'nativewind';
import { forwardRef, useCallback } from 'react';
import { View } from 'react-native';

interface Props {
  search?: string;
  onChangeText: ((text: string) => void) | undefined;
  children: React.ReactNode;
}

export const BottomSheetList = forwardRef<BottomSheet, Props>(
  ({ search, onChangeText, children }, ref) => {
    const { colorScheme } = useColorScheme();

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.3} />
      ),
      []
    );

    return (
      <BottomSheet
        index={-1}
        snapPoints={['100%']}
        ref={ref}
        enablePanDownToClose={true}
        backgroundStyle={{
          borderTopWidth: 25,
          borderWidth: 0,
          backgroundColor: THEME[colorScheme || 'light'].background,
          borderColor: THEME[colorScheme || 'light'].primary,
        }}
        backdropComponent={renderBackdrop}>
        <BottomSheetView className="flex-1">
          <View className="px-4 pt-4">
            <SearchInput
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
