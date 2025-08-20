import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { pickFromLibrary, takePhoto, type PhotoAsset } from "./Component/Photopicker"; 

// ----- scale utils -----
const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get("window");
const BASE_W = 360;
const BASE_H = 800;
const scaleW = (px: number) => (SCREEN_W / BASE_W) * px;
const scaleH = (px: number) => (SCREEN_H / BASE_H) * px;
const font = (px: number) => Math.round((SCREEN_W / BASE_W) * px);

// ----- Component -----
const Component = () => {
  const [photo, setPhoto] = React.useState<PhotoAsset | null>(null);

  const onUploadPress = React.useCallback(async () => {
    try {
      const res = await pickFromLibrary();
      if (res?.uri) setPhoto(res);
    } catch (e) {
      console.warn(e);
      Alert.alert("알림", "사진을 불러오는 중 오류가 발생했어요.");
    }
  }, []);

  const onTakePress = React.useCallback(async () => {
    try {
      const res = await takePhoto();
      if (res?.uri) setPhoto(res);
    } catch (e) {
      console.warn(e);
      Alert.alert("알림", "사진을 촬영하는 중 오류가 발생했어요.");
    }
  }, []);

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <View style={styles.container}>
        {/* 폼 카드 영역 */}
        <View style={styles.card}>
          <Text style={styles.title}>사진을 추가하세요</Text>
          <Text style={styles.subtitle}>당신을 표현할 수 있는 사진을 선택하세요</Text>

          {/* 미리보기 (없으면 placeholder) */}
          <View style={styles.heroWrap}>
            {photo?.uri ? (
              <Image style={styles.hero} source={{ uri: photo.uri }} resizeMode="cover" />
            ) : (
              <Image
                style={[styles.hero, styles.placeholder]}
                source={require("../../assets/images/earth.png")}
                resizeMode="cover"
              />
            )}
          </View>

          {/* 액션 버튼들 */}
          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.button, styles.buttonPrimary]}
              onPress={onUploadPress}
              activeOpacity={0.9}
            >
              <Text style={[styles.buttonText, styles.buttonPrimaryText]}>
                사진업로드 하기
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.buttonGhost]}
              onPress={onTakePress}
              activeOpacity={0.9}
            >
              <Text style={[styles.buttonText, styles.buttonGhostText]}>
                새 사진 찍기
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 하단 Safe Area(“맨밑의 상자도 safe area”) + 스킵 */}
        <View style={styles.footer}>
          <TouchableOpacity>
            <Text style={styles.skip}>다음에 할게요</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

// ----- Styles -----
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, paddingHorizontal: scaleW(20), justifyContent: "space-between" },

  // 폼 카드
  card: { gap: scaleH(20), alignItems: "center", paddingTop: scaleH(24) },
  title: {
    fontFamily: "Pretendard",
    fontWeight: "600",
    fontSize: font(24),
    lineHeight: font(28),
    color: "#000",
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "Pretendard",
    fontWeight: "400",
    fontSize: font(16),
    lineHeight: font(22),
    color: "#000",
    opacity: 0.9,
    textAlign: "center",
    paddingHorizontal: scaleW(12),
  },

  // 미리보기
  heroWrap: { width: "100%", alignItems: "center", marginTop: scaleH(8) },
  hero: {
    width: scaleW(200),
    height: scaleW(200),
    borderRadius: scaleW(12),
    backgroundColor: "#D9D9D9",
  },
  placeholder: { borderWidth: 1, borderColor: "#E5E7EB" },

  // 버튼들
  actions: { width: "100%", gap: scaleH(12), marginTop: scaleH(8) },
  button: {
    height: scaleH(50),
    borderRadius: scaleW(16),
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPrimary: { backgroundColor: "#EAF3FF" },
  buttonPrimaryText: { color: "#007AFF", fontWeight: "600" },
  buttonGhost: { backgroundColor: "#111827" },
  buttonGhostText: { color: "#F2F2F7", fontWeight: "600" },
  buttonText: { fontFamily: "Pretendard", fontSize: font(16), lineHeight: font(22) },

  // 하단 Safe Area + 스킵
  footer: { paddingBottom: scaleH(12), alignItems: "center" },
  skip: {
    fontFamily: "Pretendard",
    fontSize: font(17),
    lineHeight: font(22),
    fontWeight: "600",
    color: "#94A3B8",
  },
});

export default Component;
