import React from "react";
import { View, Pressable } from "react-native";
import { Stack, useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { DrawerActions } from "@react-navigation/native";
import Vector from "../../assets/images/vector1.svg";    // ← 아이콘
import Hamburger from "../../assets/images/trident.svg"; // ≡ 아이콘
import { scaleH, scaleW } from "@/utils/scale";

export default function TravelLayout() {
  const navigation = useNavigation();

  return (
    <View className="flex-1">
      {/* 커스텀 헤더 */}
      <View
        className="absolute top-0 left-0 right-0 z-10 flex-row justify-between items-center px-4"
        style={{ height: scaleH(56) }} // 안드로이드 툴바 기본 높이 감안
      >
        {/* ← 아이콘 */}
        <Pressable onPress={() => navigation.goBack()} className="p-2">
          <Vector width={scaleW(24)} height={scaleH(24)} />
        </Pressable>

        {/* ≡ 아이콘 */}
        <Pressable
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          className="p-2"
        >
          <Hamburger width={scaleW(24)} height={scaleH(24)} />
        </Pressable>
      </View>

      {/* 스택 화면 */}
      <Stack 
        screenOptions={{ headerShown: false }}
        initialRouteName="SelectCity"
      />
    </View>
  );
}