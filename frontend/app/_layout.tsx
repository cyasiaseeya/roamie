import React from 'react';
import { Stack } from 'expo-router';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { scaleW } from '../utils/scale';

function Shell({ children }: { children: React.ReactNode }) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,        // 상단 노치 대응
        paddingBottom: insets.bottom,  // 하단 제스처바 대응
        alignItems: 'center',
      }}
    >
      {/* 전체 화면 사용 */}
      <View style={{ width: '100%', flex: 1 }}>
        {children}
      </View>
    </View>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Shell>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: 'transparent' },
            }}
          />
        </Shell>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
