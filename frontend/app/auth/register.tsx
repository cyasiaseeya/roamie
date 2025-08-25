// Component.tsx
import React, { useMemo, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  FlatList,
  SafeAreaView,
  Platform,
  TextInput,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { router } from "expo-router";
import Calendar from "../../assets/images/calendar.svg";
import DateTimePicker from "@react-native-community/datetimepicker";
import { scaleW, scaleH, font } from "../../utils/scale";
import { api, setToken } from "../../lib/api";
import { Alert } from "react-native";

type Gender = "남성" | "여성" | "기타";
const GENDER_OPTIONS: Gender[] = ["남성", "여성", "기타"];
const codeFromGender = (g: Gender | null) => g === "남성" ? "M" : g === "여성" ? "F" : "O";
const fmtDate = (d: Date | null) =>
  d ? `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}` : "";

const Component = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState<Gender | null>(null);
  const [birthDate, setBirthDate] = useState<Date | null>(null);

  // UI state
  const [genderOpen, setGenderOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);

  // Text placeholder 색/문구
  const genderLabel = useMemo(
    () => (gender ? gender : "성별을 선택해 주세요"),
    [gender]
  );
  const birthLabel = useMemo(
    () =>
      birthDate
        ? `${birthDate.getFullYear()}-${String(birthDate.getMonth() + 1).padStart(2, "0")}-${String(
          birthDate.getDate()
        ).padStart(2, "0")}`
        : "생년월일을 선택해 주세요",
    [birthDate]
  );

  // 폼 제출
  const onSubmit = async () => {
    try {
      const body = {
        username,
        password,
        birthdate: fmtDate(birthDate),
        gender_code: codeFromGender(gender),
        // nickname is NOT sent (we’ll add validation/rules later if you want it)
      };
      const res = await api("/auth/register", {
        method: "POST",
        body: JSON.stringify(body),
      });
      // auto-login with returned JWT
      setToken(res.token);
      router.replace("/profile/ProfilePhotoScreen");
    } catch (e: any) {
      Alert.alert("회원가입 실패", e?.message ?? String(e));
    }
  };

  return (
    <SafeAreaView style={styles.view}>
      {/* 그라데이션 배경 */}
      <LinearGradient
        colors={['#2567E8', '#0CEC80']}
        locations={[0.3, 1]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <View style={styles.view1}>
        {/* 뒤로가기 버튼 */}
        <TouchableOpacity
          style={styles.keyboardBackspaceIcon}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>



        {/* 회원가입 타이틀 */}
        <View style={styles.wrapper}>
          <Text style={styles.text4}>회원가입</Text>
        </View>

        {/* 입력 폼 카드 */}
        <View style={styles.input}>
          <View style={styles.frameParent}>
            {/* 별명 입력 */}
            <View style={styles.inputFieldWrapper}>
              <View style={styles.inputField}>
                <View style={styles.title}>
                  <Text style={styles.email}>별명</Text>
                </View>
                <TextInput
                  style={styles.inputArea}
                  placeholder="별명을 적어주세요"
                  placeholderTextColor="#8B8383"
                  value={username}
                  onChangeText={setUsername}
                />
              </View>
            </View>
            {/* 비밀번호 입력 */}
            <View style={styles.inputFieldWrapper}>
              <View style={styles.inputField}>
                <View style={styles.title}>
                  <Text style={styles.email}>비밀번호</Text>
                </View>
                <TextInput
                  style={styles.inputArea}
                  placeholder="비밀번호를 적어주세요"
                  placeholderTextColor="#8B8383"
                  value={password}
                  onChangeText={setPassword}
                />
              </View>
            </View>
            {/* 성별 선택 */}
            <View style={styles.view2}>
              <View style={styles.title1}>
                <Text style={styles.email}>성별</Text>
              </View>
              <View style={styles.component1}>
                <TouchableOpacity
                  style={styles.rectangleParent}
                  onPress={() => setGenderOpen(true)}
                  activeOpacity={0.8}
                >
                  <View style={styles.groupChild} />
                  <Text style={[styles.text1, gender ? styles.valueText : null]}>
                    {genderLabel}
                  </Text>
                  <View style={styles.chevron} />
                </TouchableOpacity>
              </View>
            </View>

            {/* 생년월일 선택 */}
            <View style={styles.view2}>
              <View style={styles.title1}>
                <Text style={styles.email}>생년월일</Text>
              </View>
              <View style={styles.component1}>
                <TouchableOpacity
                  style={styles.rectangleParent}
                  onPress={() => setDateOpen(true)}
                  activeOpacity={0.8}
                >
                  <View style={styles.groupChild} />
                  <Text style={[styles.text1, birthDate ? styles.valueText : null]}>
                    {birthLabel}
                  </Text>
                  <Calendar style={styles.groupIcon} width={scaleW(18)} height={scaleW(18)} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* 회원가입 버튼 */}
        <TouchableOpacity
          style={styles.button}
          onPress={onSubmit}
          activeOpacity={0.9}
        >
          <Text style={styles.labelText}>회원가입</Text>
        </TouchableOpacity>
      </View>

      {/* 성별 드롭다운 모달 */}
      <Modal visible={genderOpen} transparent animationType="fade" onRequestClose={() => setGenderOpen(false)}>
        <Pressable style={styles.modalBackdrop} onPress={() => setGenderOpen(false)}>
          <View />
        </Pressable>
        <View style={styles.dropdownSheet}>
          <Text style={styles.sheetTitle}>성별 선택</Text>
          <FlatList
            data={GENDER_OPTIONS as readonly string[]}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => {
                  setGender(item as Gender);
                  setGenderOpen(false);
                }}
                activeOpacity={0.8}
              >
                <Text style={styles.dropdownText}>{item}</Text>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>
      </Modal>

      {/* 날짜 선택 (iOS는 인라인/스피너, Android는 팝업) */}
      {dateOpen && (
        Platform.OS === "android" ? (
          <DateTimePicker
            mode="date"
            display="calendar"
            value={birthDate || new Date(2000, 0, 1)}
            onChange={(_, selected) => {
              setDateOpen(false);
              if (selected) setBirthDate(selected);
            }}
            maximumDate={new Date()}
          />
        ) : (
          <Modal visible transparent animationType="fade" onRequestClose={() => setDateOpen(false)}>
            <Pressable style={styles.modalBackdrop} onPress={() => setDateOpen(false)}>
              <View />
            </Pressable>
            <View style={styles.dateSheet}>
              <Text style={styles.sheetTitle}>생년월일 선택</Text>
              <DateTimePicker
                mode="date"
                display="inline"
                value={birthDate || new Date(2000, 0, 1)}
                onChange={(_, selected) => {
                  if (selected) setBirthDate(selected);
                }}
                maximumDate={new Date()}
                style={{ alignSelf: "center" }}
              />
              <TouchableOpacity style={[styles.cta, { marginTop: scaleH(16) }]} onPress={() => setDateOpen(false)}>
                <Text style={styles.ctaText}>확인</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        )
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  view1: {
    width: "100%",
    height: "100%",
    flex: 1
  },
  keyboardBackspaceIcon: {
    top: scaleH(40),
    left: scaleW(20),
    width: scaleW(40),
    height: scaleH(40),
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonText: {
    fontSize: font(24),
    color: "#FFFFFF",
    fontWeight: "700",
  },

  wrapper: {
    top: scaleH(89),
    left: "50%",
    marginLeft: scaleW(-80),
    padding: scaleW(10),
    position: "absolute"
  },
  text4: {
    fontSize: font(36),
    letterSpacing: -0.4,
    lineHeight: font(50),
    fontWeight: "700",
    fontFamily: "Pretendard",
    color: "#FFFFFF",
    textAlign: "center"
  },
  input: {
    marginTop: scaleH(-206),
    marginLeft: scaleW(-164),
    borderRadius: scaleW(16),
    width: scaleW(328),
    height: scaleH(290),
    backgroundColor: "#FFFFFF",
    top: "50%",
    left: "50%",
    position: "absolute"
  },
  frameParent: {
    marginTop: scaleH(-121),
    marginLeft: scaleW(-140),
    gap: scaleH(10),
    width: scaleW(280),
    top: "50%",
    left: "50%",
    position: "absolute"
  },
  inputFieldWrapper: {
    alignSelf: "stretch"
  },
  inputField: {
    alignSelf: "stretch",
    gap: scaleH(2)
  },
  title: {
    zIndex: 1,
    borderRadius: 100,
    justifyContent: "center",
    height: scaleH(21)
  },
  title1: {
    borderRadius: 100,
    justifyContent: "center",
    height: scaleH(21),
    top: 0,
    left: 0,
    position: "absolute"
  },
  email: {
    fontSize: font(12),
    letterSpacing: -0.2,
    lineHeight: font(19),
    fontFamily: "Pretendard",
    color: "#6C7278",
    textAlign: "left",
    fontWeight: "500"
  },
  inputArea: {
    shadowColor: "rgba(228, 229, 231, 0.24)",
    height: scaleH(46),
    paddingHorizontal: scaleW(14),
    paddingVertical: scaleH(12),
    zIndex: 0,
    borderColor: "#D9D9D9",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: scaleW(10),
    backgroundColor: "#FFFFFF",
    shadowOpacity: 1,
    elevation: 2,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 1
    },
    alignSelf: "stretch",
    alignItems: "center",
    flexDirection: "row",
    overflow: "hidden"
  },

  view2: {
    height: scaleH(69),
    alignSelf: "stretch"
  },
  component1: {
    height: scaleH(47),
    width: scaleW(280),
    left: 0,
    position: "absolute",
    top: scaleH(21)
  },
  rectangleParent: {
    height: scaleH(47),
    width: scaleW(280),
    left: 0,
    position: "absolute",
    top: 0
  },
  groupChild: {
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: scaleW(10),
    borderColor: "#D9D9D9",
    backgroundColor: "#FFFFFF",
    top: 0,
    height: scaleH(47),
    width: scaleW(280),
    left: 0,
    position: "absolute"
  },
  text1: {
    top: scaleH(13),
    left: scaleW(14),
    position: "absolute",
    color: "#8B8383",
    lineHeight: font(20),
    fontSize: font(14),
    width: scaleW(207),
    fontFamily: "Pretendard",
    letterSpacing: -0.1,
    textAlign: "left",
    fontWeight: "500",
    height: scaleH(21),
    overflow: "hidden"
  },
  valueText: {
    color: "#171717"
  },
  chevron: {
    position: "absolute",
    right: scaleW(14),
    top: scaleH(21),
    width: 0,
    height: 0,
    borderLeftWidth: scaleW(6),
    borderRightWidth: scaleW(6),
    borderTopWidth: scaleW(6),
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#8B8B8B",
  },
  groupIcon: {
    position: "absolute",
    right: scaleW(14),
    top: scaleH(15),
  },
  button: {
    marginLeft: scaleW(-150),
    top: scaleH(529),
    shadowColor: "rgba(37, 62, 167, 0.48)",
    backgroundColor: "#1D61E7",
    borderColor: "rgba(255, 255, 255, 0.12)",
    width: scaleW(300),
    paddingHorizontal: scaleW(24),
    paddingVertical: scaleH(10),
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: scaleW(10),
    shadowOpacity: 1,
    elevation: 2,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 1
    },
    justifyContent: "center",
    height: scaleH(48),
    alignItems: "center",
    flexDirection: "row",
    left: "50%",
    overflow: "hidden",
    position: "absolute"
  },
  labelText: {
    fontSize: font(15),
    lineHeight: font(21),
    textAlign: "center",
    color: "#FFFFFF",
    fontFamily: "Pretendard",
    letterSpacing: -0.1,
    fontWeight: "500"
  },

  // Modal styles
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  dropdownSheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: scaleW(16),
    borderTopRightRadius: scaleW(16),
    paddingHorizontal: scaleW(20),
    paddingTop: scaleH(14),
    paddingBottom: scaleH(24),
  },
  sheetTitle: {
    fontSize: font(16),
    fontWeight: "700",
    marginBottom: scaleH(8),
    fontFamily: "Pretendard",
  },
  dropdownItem: {
    paddingVertical: scaleH(12),
    paddingHorizontal: scaleW(6),
  },
  dropdownText: {
    fontSize: font(15),
    fontFamily: "Pretendard",
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#EAEAEA",
  },
  dateSheet: {
    position: "absolute",
    left: scaleW(10),
    right: scaleW(10),
    bottom: scaleH(10),
    backgroundColor: "#FFFFFF",
    borderRadius: scaleW(16),
    padding: scaleW(16),
    shadowColor: "rgba(0,0,0,0.25)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 6,
    elevation: 4,
  },
  cta: {
    height: scaleH(48),
    borderRadius: scaleW(10),
    backgroundColor: "#1D61E7",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    shadowColor: "rgba(37,62,167,0.48)",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
  ctaText: {
    color: "#FFFFFF",
    fontSize: font(15),
    lineHeight: font(21),
    letterSpacing: -0.1,
    fontFamily: "Pretendard",
    fontWeight: "600",
  },
});

export default Component;
