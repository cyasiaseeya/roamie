import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  Platform,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { scaleW, scaleH, font } from "../../utils/scale";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

// ✅ SVG는 컴포넌트처럼 import (require X)
import ArrowNarrowLeft from "../../assets/images/arrownarrowleft.svg";
import CalendarDue from "../../assets/images/calendardue.svg";

// 네비게이션 타입
type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
};
type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, "SignUp">;

type GenderValue = "male" | "female" | "other" | "";

const GENDER_OPTIONS: { label: string; value: GenderValue }[] = [
  { label: "남자", value: "male" },
  { label: "여자", value: "female" },
  { label: "기타", value: "other" },
];

const SignUpScreen: React.FC<SignUpScreenProps> = ({ navigation }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("2003/02/18");
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [gender, setGender] = useState<GenderValue>("");
  const [showGenderPicker, setShowGenderPicker] = useState<boolean>(false);
  const [customGender, setCustomGender] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onChangeBirthday = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      const yyyy = selectedDate.getFullYear();
      const mm = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const dd = String(selectedDate.getDate()).padStart(2, "0");
      setBirthday(`${yyyy}/${mm}/${dd}`);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["bottom", "left", "right"]}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            {/* 헤더 */}
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: scaleH(12) }}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingRight: scaleW(8) }}>
                <ArrowNarrowLeft width={scaleW(24)} height={scaleW(24)} />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>회원가입</Text>
            </View>

            <View style={styles.signUpRow}>
              <Text style={styles.subText}>이미 회원이신가요?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.loginLink}>로그인</Text>
              </TouchableOpacity>
            </View>

            {/* 입력 폼 */}
            <View style={styles.form}>
              <FormField
                label="이름"
                value={name}
                onChangeText={setName}
                placeholder="이름을 입력해 주세요"
              />

              <FormField
                label="이메일"
                value={email}
                onChangeText={setEmail}
                placeholder="이메일을 입력해 주세요"
                keyboardType="email-address"
                autoCapitalize="none"
              />

              {/* 생년월일 */}
              <TouchableOpacity onPress={() => setShowDatePicker(true)} activeOpacity={0.8}>
                <View pointerEvents="none">
                  <FormField
                    label="생년월일"
                    value={birthday}
                    editable={false}
                    rightIcon={<CalendarDue width={scaleW(16)} height={scaleW(16)} />}
                  />
                </View>
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={new Date(birthday.replace(/-/g, "/").replace(/\./g, "/"))}
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={onChangeBirthday}
                  maximumDate={new Date()}
                />
              )}

              {/* 성별 */}
              <TouchableOpacity onPress={() => setShowGenderPicker(true)} activeOpacity={0.8}>
                <View pointerEvents="none">
                  <FormField
                    label="성별"
                    value={gender ? GENDER_OPTIONS.find(g => g.value === gender)?.label ?? "" : "성별을 선택해 주세요"}
                    editable={false}
                    rightIcon={<Text style={styles.caret}>▾</Text>}
                  />
                </View>
              </TouchableOpacity>

              <Modal
                visible={showGenderPicker}
                transparent
                animationType="fade"
                onRequestClose={() => setShowGenderPicker(false)}
              >
                <TouchableOpacity style={styles.modalBg} onPress={() => setShowGenderPicker(false)} activeOpacity={1}>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={gender}
                      onValueChange={(itemValue) => {
                        setGender(itemValue as GenderValue);
                        setShowGenderPicker(false);
                      }}
                    >
                      <Picker.Item label="성별을 선택해 주세요" value="" />
                      {GENDER_OPTIONS.map(option => (
                        <Picker.Item key={option.value} label={option.label} value={option.value} />
                      ))}
                    </Picker>
                  </View>
                </TouchableOpacity>
              </Modal>

              {/* 기타 선택 시 직접입력 */}
              {gender === "other" && (
                <FormField
                  label="성별(기타)"
                  value={customGender}
                  onChangeText={setCustomGender}
                  placeholder="직접 입력"
                />
              )}

              <FormField
                label="비밀번호"
                value={password}
                onChangeText={setPassword}
                placeholder="비밀번호를 입력해 주세요"
                secureTextEntry
                // 필요하면 우측 아이콘 추가: rightIcon={<EyeOff width={scaleW(16)} height={scaleW(16)} />}
              />
            </View>

            {/* 회원가입 버튼 */}
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>회원가입</Text>
            </TouchableOpacity>
          </View>

          {/* 하단 safe area bar */}
          <View style={styles.bottomSafeArea} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// ---- FormField ----
interface FormFieldProps {
  label: string;
  value: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  editable?: boolean;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  rightIcon?: React.ReactNode; // ✅ 아이콘을 리액트 노드로
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  editable = true,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
  rightIcon,
}) => (
  <View style={styles.formField}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <View style={styles.fieldInputWrap}>
      <TextInput
        style={[styles.fieldValue, !editable && { color: "#6c7278" }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        editable={editable}
        pointerEvents={editable ? "auto" : "none"}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
      />
      {rightIcon}
    </View>
  </View>
);

// ---- styles ----
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#007aff" },
  scroll: { flexGrow: 1, justifyContent: "center", paddingHorizontal: scaleW(16) },
  container: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: scaleW(16),
    padding: scaleW(24),
    gap: scaleH(18),
    marginVertical: scaleH(36),
  },
  headerTitle: {
    fontSize: font(28),
    fontWeight: "700",
    color: "#111827",
    letterSpacing: -0.6,
    fontFamily: "Inter-Bold",
  },
  signUpRow: { flexDirection: "row", alignItems: "center", gap: scaleW(6), marginBottom: scaleH(8) },
  subText: { color: "#6c7278", fontWeight: "500", fontSize: font(12), fontFamily: "Inter-Medium" },
  loginLink: { color: "#4d81e7", fontWeight: "600", fontSize: font(12), fontFamily: "Inter-SemiBold", marginLeft: scaleW(6) },
  form: { gap: scaleH(10), marginBottom: scaleH(12) },
  formField: { marginBottom: scaleH(8) },
  fieldLabel: {
    color: "#6c7278",
    fontWeight: "500",
    fontSize: font(12),
    marginBottom: scaleH(4),
    fontFamily: "PlusJakartaSans-Medium",
  },
  fieldInputWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: scaleW(10),
    borderWidth: 1,
    borderColor: "#d9d9d9",
    paddingVertical: scaleH(12),
    paddingHorizontal: scaleW(14),
    shadowColor: "rgba(228,229,231,0.24)",
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
    minHeight: scaleH(46),
  },
  fieldValue: { color: "#1a1c1e", fontSize: font(14), flex: 1, fontWeight: "500", fontFamily: "Inter-Medium", padding: 0 },
  button: {
    backgroundColor: "#1d61e7",
    borderRadius: scaleW(10),
    paddingVertical: scaleH(14),
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "rgba(37,62,167,0.48)",
    elevation: 2,
    marginTop: scaleH(10),
  },
  buttonText: { color: "#fff", fontSize: font(16), fontWeight: "500", fontFamily: "Inter-Medium", letterSpacing: -0.1 },
  modalBg: { flex: 1, backgroundColor: "rgba(0,0,0,0.3)", justifyContent: "center", alignItems: "center" },
  pickerContainer: { backgroundColor: "#fff", borderRadius: scaleW(12), width: scaleW(280), paddingVertical: scaleH(10), elevation: 3 },
  bottomSafeArea: {
    height: scaleH(16),
    backgroundColor: "#d9d9d9",
    width: "100%",
    marginTop: scaleH(8),
    borderBottomLeftRadius: scaleW(16),
    borderBottomRightRadius: scaleW(16),
  },
  caret: { fontSize: font(16), marginLeft: scaleW(6) },
});

export default SignUpScreen;
