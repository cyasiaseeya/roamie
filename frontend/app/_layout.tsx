import React from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setToken } from "../utils/api";
import {Drawer} from 'expo-router/drawer';
import { Stack} from 'expo-router';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { scaleW } from '../utils/scale';
import CustomDrawer from "../component/Drawer";
import './globals.css';

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
  React.useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem('jwt_token');
        if (saved) setToken(saved);
      } catch (e) {
        // noop
      }
    })();
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Shell>
      <Drawer
        initialRouteName="index"
        screenOptions={{ headerShown: false }}
        drawerContent={(props) => <CustomDrawer {...props} />}>
            {/* 여행 관련 그룹 */}
            <Drawer.Screen name="(travel)" options={{ title: "여행" }} />

            {/* 프로필 관련 그룹 */}
            <Drawer.Screen name="profile" options={{ title: "프로필" }} />

            {/* 기본 Stack (Drawer 밖에서도 쓰고 싶은 화면이 있다면 여기에) */}
            <Drawer.Screen
              name="index"
              options={{ title: "홈" }}
            />
            {/* 메인 페이지 라우트 */}
            <Drawer.Screen
              name="MainPage"
              options={{ title: "메인" }}
            />
          </Drawer>
        </Shell>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

