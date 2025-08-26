import * as React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { router } from "expo-router";
import { GoogleIcon, KakaoIcon } from "../../component/Icons";
import { scaleW, scaleH, font } from "../../utils/scale";

const LoginScreen = () => {
  const [id, setId] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <SafeAreaView style={styles.container}>
      {/* 그라데이션 배경 */}
      <LinearGradient
        colors={['#007AFF', '#0CEC80']}
        locations={[0.3, 1]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      {/* 상단 영역 - 지구본과 타이틀 */}
      <View style={styles.topSection}>
        {/* 지구본 */}
        <Image
          style={styles.earth}
          resizeMode="contain"
          source={require("../../assets/images/earth.png")}
        />
        <Text style={styles.title}>Roamie</Text>
      </View>

      {/* 중앙 영역 - 입력 필드들 */}
      <View style={styles.centerSection}>
        {/* 아이디 입력 */}
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>아이디</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="아이디를 적어주세요"
            placeholderTextColor="#8b8383"
            value={id}
            onChangeText={setId}
          />
        </View>

        {/* 비밀번호 입력 */}
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>비밀번호</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="비밀번호를 적어주세요"
            placeholderTextColor="#8b8383"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* 로그인 버튼 */}
        <TouchableOpacity 
          style={styles.button}
          //onPress={() => router.push("/main")}
        >
          <Text style={styles.buttonText}>로그인</Text>
        </TouchableOpacity>
      </View>

      {/* 하단 영역 - 소셜 로그인과 회원가입 */}
      <View style={styles.bottomSection}>
        {/* 소셜 로그인 아이콘들 */}
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <KakaoIcon size={scaleW(24)} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <GoogleIcon size={scaleW(24)} />
          </TouchableOpacity>
        </View>

        {/* 회원가입 안내 */}
        <Text style={styles.footerText}>
          계정이 없으신가요? <Text style={styles.signup} onPress={() => router.push("/auth/register")}>회원가입</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  topSection: {
    height: 266,
    position: 'relative',
  },
  earth: {
    position: "absolute",
    left: "50%",
    marginLeft: scaleW(-125),
    top: scaleH(46),
    width: scaleW(250),
    height: scaleH(187)
  },
  title: {
    position: "absolute",
    left: 0,
    right: 0,
    top: scaleH(46 + 187), // 지구본 top(46) + 지구본 높이(187) - 딱 맞게
    fontSize: font(48),
    lineHeight: font(56),
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    fontFamily: "Pretendard"
  },
  centerSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: scaleW(20),
  },
  inputWrapper: {
    width: scaleW(300),
    marginBottom: scaleH(24),
  },
  label: {
    fontSize: font(12),
    fontWeight: "500",
    marginBottom: scaleH(6),
    color: "#fff",
  },
  inputBox: {
    width: scaleW(300),
    height: scaleH(46),
    borderRadius: scaleW(10),
    borderWidth: 1,
    borderColor: "#d9d9d9",
    backgroundColor: "#fff",
    paddingHorizontal: scaleW(14),
    fontSize: font(14),
    color: "#000",
  },
  button: {
    width: scaleW(300),
    height: scaleH(46),
    backgroundColor: "#1d61e7",
    borderRadius: scaleW(10),
    justifyContent: "center",
    alignItems: "center",
    marginTop: scaleH(24),
  },
  buttonText: {
    fontSize: font(15),
    fontWeight: "500",
    color: "#fff",
  },
  bottomSection: {
    paddingBottom: scaleH(40),
    alignItems: "center",
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: scaleH(36),
    gap: scaleW(20),
  },
  socialButton: {
    width: scaleW(50),
    height: scaleH(50),
    borderRadius: scaleW(25),
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    fontSize: font(14),
    color: "#fff",
    textAlign: "center",
    marginTop: scaleH(46),
  },
  signup: {
    color: "#007aff",
    fontWeight: "600",
  },
});
