import React from 'react';
import { Stack } from 'expo-router';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { scaleW } from '../utils/scale';

function Shell({ children }: { children: React.ReactNode }) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,        // 상단 노치 대응
        paddingBottom: insets.bottom,  // 하단 제스처바 대응
        backgroundColor: '#2B84FF',    // 로그인 배경 파랑
        alignItems: 'center',
      }}
    >
      {/* 내부 컨텐츠는 최대 360 기준으로 그리기 */}
      <View style={{ width: '100%', maxWidth: scaleW(360), flex: 1 }}>
        {children}
      </View>
    </View>
  );
}

export default function RootLayout() {
  return (
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
  );
}
