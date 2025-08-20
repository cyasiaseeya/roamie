import React from "react";
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, SafeAreaView } from "react-native";
import { scaleW, scaleH, font } from "../../utils/scale";
import { router, useRouter } from 'expo-router';
const GLOBE_IMAGE = require("../../assets/images/earth.png"); // 파일명/경로만 맞게!

export default function LoginScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.innerWrap}>
        {/* 지구본 */}
        <Image
          source={GLOBE_IMAGE}
          style={styles.globe}
          resizeMode="contain"
        />
        {/* 로그인 카드 */}
        <View style={styles.card}>
          <Text style={styles.title}>로그인</Text>
          {/* 이메일 입력 */}
          <View style={styles.inputWrap}>
            <Text style={styles.label}>아이디</Text>
            <TextInput
              placeholder="아이디를 입력하세요"
              placeholderTextColor="#9DA3AE"
              style={styles.input}
              autoCapitalize="none"
            />
          </View>
          {/* 비밀번호 입력 */}
          <View style={styles.inputWrap}>
            <Text style={styles.label}>비밀번호</Text>
            <TextInput
              placeholder="비밀번호를 입력하세요"
              placeholderTextColor="#9DA3AE"
              secureTextEntry
              style={styles.input}
            />
          </View>
          {/* 아이디 기억/비밀번호 찾기 */}
          <View style={styles.row}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.checkbox} />
              <Text style={styles.checkboxLabel}>아이디 기억하기</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.link}>비밀번호 찾기</Text>
            </TouchableOpacity>
          </View>
          {/* 로그인 버튼 */}
          <TouchableOpacity style={styles.loginBtn}>
            <Text style={styles.loginBtnText}>로그인</Text>
          </TouchableOpacity>
          {/* 회원가입 안내 */}
          <View style={styles.signupRow}>
            <Text style={styles.signupText}>계정이 없나요?</Text>
            <TouchableOpacity onPress={() => router.push('/auth/register')}>
              <Text style={styles.signupLink}> 회원가입</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    backgroundColor: "#007aff",
  },
  globe: {
    width: scaleW(360),
    height: scaleH(350),
    marginTop: scaleH(-10),
    marginBottom: scaleH(-160), // 카드가 위로 파고들도록 음수!
    zIndex: 1,
  },
  card: {
    width: scaleW(326),// ← Figma와 동일 폭
    height: scaleH(428),
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: scaleW(24),
    paddingHorizontal: scaleW(20),
    paddingTop: scaleH(36),     // 지구본과 겹쳤을 때 컨텐츠가 너무 위로 붙지 않게
    paddingBottom: scaleH(24),
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    zIndex: 2,
  },
  title: {
    fontSize: font(26),
    fontWeight: "800",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: scaleH(18),
  },
  inputWrap: {
    marginBottom: scaleH(16),
  },
  label: {
    fontSize: font(13),
    color: "#374151",
    marginBottom: scaleH(6),
  },
  input: {
    height: scaleH(44),
    borderRadius: scaleW(10),
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: scaleW(14),
    backgroundColor: "#F9FAFB",
    fontSize: font(15),
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: scaleH(4),
    marginBottom: scaleH(10),
  },
  checkbox: {
    width: scaleW(18),
    height: scaleW(18),
    borderRadius: scaleW(4),
    borderWidth: 1,
    borderColor: "#CBD5E1",
    marginRight: scaleW(8),
    backgroundColor: "#fff",
  },
  checkboxLabel: {
    fontSize: font(12),
    color: "#6B7280",
  },
  link: {
    fontSize: font(12),
    color: "#2B84FF",
    fontWeight: "600",
  },
  loginBtn: {
    height: scaleH(48),
    backgroundColor: "#2B84FF",
    borderRadius: scaleW(12),
    alignItems: "center",
    justifyContent: "center",
    marginTop: scaleH(6),
  },
  loginBtnText: {
    fontSize: font(15),
    color: "#fff",
    fontWeight: "800",
  },
  signupRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: scaleH(12),
  },
  signupText: {
    fontSize: font(12),
    color: "#6B7280",
  },
  signupLink: {
    fontSize: font(12),
    color: "#2B84FF",
    fontWeight: "700",
  },
});
