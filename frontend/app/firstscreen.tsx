import React from "react";
import { StyleSheet, View, Image, Text, SafeAreaView } from "react-native";
import { scaleW, scaleH, font } from "../utils/scale";

// 지구본 이미지 저장한 위치에 맞게 import
// 예시: /assets/globe.png
const GLOBE_IMAGE = require('../assets/images/earth.png');
import { useEffect } from "react";
import { useRouter } from "expo-router";


export default function FirstScreen() {
    const router = useRouter();
        useEffect(() => {
        const timer = setTimeout(() => {
            router.replace("/(auth)/login");
        }, 3000);
    
        return () => clearTimeout(timer);
    }, []);
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.innerWrap}>
        {/* 지구본 이미지 */}
        <Image
          source={GLOBE_IMAGE}
          style={styles.globe}
          resizeMode="contain"
        />
        {/* 타이틀/서브타이틀 */}
        <Text style={styles.title}>Roam with Your Homies</Text>
        <Text style={styles.brand}>Roamie</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#007aff",
    alignItems: "center",
  },
  innerWrap: {
    width: "100%",
    maxWidth: scaleW(360),
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007aff",
  },
  globe: {
    width: scaleW(352),    // 원래 피그마 기준에 맞춰 크기 조절
    height: scaleW(360),
    marginBottom: scaleH(28),
  },
  title: {
    fontSize: font(18),
    color: "#fff",
    textAlign: "center",
    marginTop: scaleH(10),
    fontFamily: "Andika", // 폰트 등록 안 했으면 기본 Sans 사용
    lineHeight: scaleH(24),
    alignSelf: "stretch",
  },
  brand: {
    fontSize: font(48),
    color: "#fff",
    fontWeight: "700",
    textAlign: "center",
    fontFamily: "Pretendard", // 폰트 등록 안 했으면 기본 Sans 사용
    lineHeight: scaleH(48),
    marginTop: scaleH(6),
    alignSelf: "stretch",
  },
});
