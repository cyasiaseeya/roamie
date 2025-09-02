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
import VisibilityOff from "../../assets/images/visibility_off.svg";
import VisibilityOn from "../../assets/images/visibility.svg";
import DateTimePicker from "@react-native-community/datetimepicker";
import { scaleW, scaleH, font } from "../../utils/scale";
import { api, setToken } from "../../lib/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  
  // 유효성 검사 상태
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // UI state
  const [genderOpen, setGenderOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

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

  // 유효성 검사 함수
  const validateUsername = (value: string): string => {
    if (value.length < 5 || value.length > 14) {
      return "아이디는 5~14자 사이로 입력해 주세요";
    }
    if (!/^[a-zA-Z0-9]+$/.test(value)) {
      return "아이디는 영어와 숫자만 사용할 수 있습니다";
    }
    return "";
  };

  const validatePassword = (value: string): string => {
    if (value.length < 8 || value.length > 21) {
      return "비밀번호는 8~21자 사이로 입력해 주세요";
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      return "특수문자 '! @ # $ % ^ & * ( )'를 포함해야 합니다";
    }
   
    return "";
  };

  // 실시간 유효성 검사
  const handleUsernameChange = (value: string) => {
    setUsername(value);
    setUsernameError(validateUsername(value));
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setPasswordError(validatePassword(value));
  };

  // 폼 제출
  const onSubmit = async () => {
    // 최종 유효성 검사
    const usernameErr = validateUsername(username);
    const passwordErr = validatePassword(password);
    
    setUsernameError(usernameErr);
    setPasswordError(passwordErr);
    
    if (usernameErr || passwordErr) {
      Alert.alert("입력 오류", "입력 정보를 다시 확인해주세요.");
      return;
    }
    
    if (!gender || !birthDate) {
      Alert.alert("입력 오류", "모든 정보를 입력해주세요.");
      return;
    }
    
    try {
      const body = {
        username,
        password,
        birthdate: fmtDate(birthDate),
        gender_code: codeFromGender(gender),
      };
      const res = await api("/auth/register", {
        method: "POST",
        body: JSON.stringify(body),
      });
      // auto-login with returned JWT
      setToken(res.token);
      
      // Save JWT token to AsyncStorage for persistence
      await AsyncStorage.setItem('jwt_token', res.token);
      
      router.replace("/profile/ProfilePhotoScreen");
    } catch (e: any) {
      Alert.alert("회원가입 실패", e?.message ?? String(e));
    }
  };

  return (
    <SafeAreaView style={styles.view}>
      {/* 그라데이션 배경 */}
      <LinearGradient
        colors={['#007AFF', '#0CEC80']}
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
                  <Text style={styles.email}>아이디</Text>
                </View>
                <TextInput
                  style={[styles.inputArea, usernameError ? styles.inputError : null]}
                  placeholder="아이디를 입력해주세요"
                  placeholderTextColor="#8B8383"
                  value={username}
                  onChangeText={handleUsernameChange}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                {usernameError ? (
                  <Text style={styles.errorText}>{usernameError}</Text>
                ) : null}
              </View>
            </View>

            {/* 비밀번호 입력 */}
            <View style={styles.inputFieldWrapper}>
              <View style={styles.inputField}>
                <View style={styles.title}>
                  <Text style={styles.email}>비밀번호</Text>
                </View>
                <View style={styles.passwordContainer}>
                  <TextInput
                      style={[styles.inputArea, passwordError ? styles.inputError : null]}
                    placeholder="비밀번호를 입력해주세요"
                    placeholderTextColor="#8B8383"
                    value={password}
                    onChangeText={handlePasswordChange}
                    secureTextEntry={!passwordVisible}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <TouchableOpacity
                    style={styles.visibilityButton}
                    onPress={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? (
                      <VisibilityOn width={scaleW(20)} height={scaleH(20)} />
                    ) : (
                      <VisibilityOff width={scaleW(20)} height={scaleH(20)} />
                    )}
                  </TouchableOpacity>
                </View>
                {passwordError ? (
                  <Text style={styles.errorText}>{passwordError}</Text>
                ) : null}
              </View>
            </View>

            {/* 성별 선택 */}
            <View style={styles.genderContainer}>
              <View style={styles.title}>
                <Text style={styles.email}>성별</Text>
              </View>
              <View style={styles.component1}>
                <TouchableOpacity
                  style={styles.rectangleParent}
                  onPress={() => setGenderOpen(!genderOpen)}
                  activeOpacity={0.8}
                >
                  <View style={styles.groupChild} />
                  <Text style={[styles.text1, gender ? styles.valueText : null]}>
                    {genderLabel}
                  </Text>
                  <View style={[styles.chevron, genderOpen && styles.chevronUp]} />
                </TouchableOpacity>
              </View>
              {/* 인라인 드롭다운 */}
              {genderOpen && (
                <View style={styles.inlineDropdown}>
                  {GENDER_OPTIONS.map((option, index) => (
                    <TouchableOpacity
                      key={option}
                      style={[
                        styles.inlineDropdownItem,
                        index === GENDER_OPTIONS.length - 1 && styles.lastDropdownItem
                      ]}
                      onPress={() => {
                        console.log('Gender option pressed:', option);
                        setGender(option);
                        setGenderOpen(false);
                      }}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.inlineDropdownText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* 생년월일 선택 */}
            <View style={styles.birthdateContainer}>
              <View style={styles.title}>
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
            <Pressable style={styles.dateModalBackdrop} onPress={() => setDateOpen(false)}>
              <View />
            </Pressable>
            <View style={styles.dateSheet}>
              <Text style={styles.dateSheetTitle}>생년월일 선택</Text>
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
    top: scaleH(164),
    marginLeft: scaleW(-164),
    borderRadius: scaleW(16),
    width: scaleW(328),
    height: scaleH(423),
    backgroundColor: "#FFFFFF",
    left: "50%",
    position: "absolute"
  },
  frameParent: {
    flex: 1,
    paddingHorizontal: scaleW(24),
    paddingTop: scaleH(24), // 상단 여백만 24로 줄임
    paddingBottom: scaleH(32),
    gap: scaleH(28), // 28 간격으로 설정
  },
  inputFieldWrapper: {
    // marginBottom 제거하고 gap으로 통일
  },
  inputField: {
    gap: scaleH(8), // 라벨과 입력필드 사이 간격
  },
  title: {
    justifyContent: "center",
    height: scaleH(18),
  },
  email: {
    fontSize: font(12),
    letterSpacing: -0.2,
    lineHeight: font(16),
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
  inputError: {
    borderColor: "#FF3B30",
    borderWidth: 2,
  },
  errorText: {
    fontSize: font(11),
    color: "#FF3B30",
    marginTop: scaleH(4),
    marginLeft: scaleW(2),
    fontFamily: "Pretendard",
  },
  passwordContainer: {
    position: "relative",
    width: "100%",
  },
  visibilityButton: {
    position: "absolute",
    right: scaleW(14),
    top: scaleH(12),
    padding: scaleW(4),
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  genderContainer: {
    position: "relative",
    zIndex: 1,
  },
  birthdateContainer: {
    // 새로운 스타일 - view2를 대체
  },
  component1: {
    height: scaleH(47),
    marginTop: scaleH(8), // 라벨과의 간격
  },
  rectangleParent: {
    height: scaleH(47),
    width: "100%",
  },
  groupChild: {
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: scaleW(10),
    borderColor: "#D9D9D9",
    backgroundColor: "#FFFFFF",
    top: 0,
    height: scaleH(47),
    width: "100%",
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
  chevronUp: {
    borderTopWidth: 0,
    borderBottomWidth: scaleW(6),
    borderBottomColor: "#8B8B8B",
  },
  inlineDropdown: {
    position: "absolute",
    top: scaleH(55),
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderRadius: scaleW(10),
    borderWidth: 1,
    borderColor: "#D9D9D9",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 10,
    zIndex: 9999,
  },
  inlineDropdownItem: {
    paddingVertical: scaleH(12),
    paddingHorizontal: scaleW(14),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#EAEAEA",
  },
  lastDropdownItem: {
    borderBottomWidth: 0,
  },
  inlineDropdownText: {
    fontSize: font(14),
    fontFamily: "Pretendard",
    color: "#171717",
  },
  dropdownOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 500,
  },
  groupIcon: {
    position: "absolute",
    right: scaleW(14),
    top: scaleH(15),
  },
  button: {
    marginLeft: scaleW(-150),
    top: scaleH(620), // InputWrapper 높이 423 + top 164 + 여백 조정
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
  dateModalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
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
  dateSheetTitle: {
    fontSize: font(16),
    fontWeight: "700",
    marginBottom: scaleH(8),
    fontFamily: "Pretendard",
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