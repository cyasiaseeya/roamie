import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { pickFromLibrary, takePhoto, type PhotoAsset } from "./Component/Photopicker";
import { scaleW, scaleH, font } from "../../utils/scale";
import { api } from "../../utils/api";

// 이동할 경로 (실제 파일 경로에 맞게 조정 가능)
const NEXT_PATH = "/(survey)/survey1";

// ----- Component -----
const Component = () => {
  const router = useRouter();
  const [photo, setPhoto] = React.useState<PhotoAsset | null>(null);
  const [submitting, setSubmitting] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const goNext = React.useCallback(
    (uri?: string) => {
      // uri를 다음 화면에 넘기고 싶다면 아래처럼 사용:
      // router.push({ pathname: NEXT_PATH, params: { photoUri: uri ?? "" } });
      router.push(NEXT_PATH); // 히스토리 없이 가려면 replace 사용
    },
    [router]
  );

  const onUploadPress = React.useCallback(async () => {
    try {
      setErrorMsg(null);
      const res = await pickFromLibrary();
      console.log("[pickFromLibrary] result:", res);
      const uri = (res as any)?.uri || (res as any)?.assets?.[0]?.uri; // 방어적 접근
      if (uri) {
        setPhoto({ ...(res as any), uri });
      } else {
        Alert.alert("알림", "유효한 사진을 찾지 못했어요.");
      }
    } catch (e) {
      console.warn(e);
      Alert.alert("알림", "사진을 불러오는 중 오류가 발생했어요.");
    }
  }, []);

  const onTakePress = React.useCallback(async () => {
    try {
      setErrorMsg(null);
      const res = await takePhoto();
      console.log("[takePhoto] result:", res);
      const uri = (res as any)?.uri || (res as any)?.assets?.[0]?.uri; // 방어적 접근
      if (uri) {
        setPhoto({ ...(res as any), uri });
      } else {
        Alert.alert("알림", "유효한 사진을 찾지 못했어요.");
      }
    } catch (e) {
      console.warn(e);
      Alert.alert("알림", "사진을 불러오는 중 오류가 발생했어요.");
    }
  }, []);

  const onSubmitPress = React.useCallback(async () => {
    if (!photo?.uri) {
      Alert.alert("알림", "먼저 사진을 선택하거나 촬영해주세요.");
      return;
    }
    try {
      setSubmitting(true);
      setErrorMsg(null);
      console.log("[avatar] start", {
        uri: photo.uri,
        type: (photo as any)?.type,
      });
      const form = new FormData();
      const mime = (photo as any)?.type || "image/jpeg";
      const filename = mime === "image/png" ? "avatar.png" : mime === "image/webp" ? "avatar.webp" : "avatar.jpg";
      form.append("file", {
        uri: photo.uri,
        name: filename,
        type: mime,
      } as any);
      const res = await api("/profile/avatar", { method: "POST", body: form }, { timeoutMs: 45000 });
      console.log("[avatar] server response", res);
      goNext(photo.uri);
    } catch (e: any) {
      console.warn("[avatar upload] error:", e?.status, e?.body || e);
      const msg = e?.body || e?.message || "사진을 업로드하는 중 오류가 발생했어요.";
      setErrorMsg(typeof msg === 'string' ? msg : JSON.stringify(msg));
      Alert.alert("업로드 실패", typeof msg === 'string' ? msg : JSON.stringify(msg));
    } finally {
      setSubmitting(false);
    }
  }, [photo, goNext]);

  const onSkipPress = React.useCallback(() => {
    // 스킵: 사진 없이 바로 이동
    router.push(NEXT_PATH);
    // router.replace(NEXT_PATH); // 히스토리 제거 원하면 이걸로
  }, [router]);

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

            <TouchableOpacity
              style={[
                styles.button,
                styles.buttonSubmit,
                (!photo || submitting) && styles.buttonDisabled,
              ]}
              onPress={onSubmitPress}
              activeOpacity={0.9}
              disabled={!photo || submitting}
            >
              <Text style={[styles.buttonText, styles.buttonSubmitText]}>
                {submitting ? "업로드 중..." : "제출하기"}
              </Text>
            </TouchableOpacity>
          </View>
          {errorMsg ? (
            <Text style={styles.error}>{errorMsg}</Text>
          ) : null}
        </View>

        {/* 하단 Safe Area(“맨밑의 상자도 safe area”) + 스킵 */}
        <View style={styles.footer}>
          <TouchableOpacity onPress={onSkipPress}>
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
  buttonSubmit: { backgroundColor: "#007AFF" },
  buttonSubmitText: { color: "#FFFFFF", fontWeight: "700" },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { fontFamily: "Pretendard", fontSize: font(16), lineHeight: font(22) },
  error: {
    marginTop: scaleH(6),
    color: "#FF3B30",
    fontFamily: "Pretendard",
    fontSize: font(12),
    textAlign: "center",
  },

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
