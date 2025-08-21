import * as React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { router } from "expo-router";
import { GoogleIcon, KakaoIcon } from "../../component/Icons";
import { scaleW, scaleH, font } from "../../utils/scale";

const Component = () => {
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
        {/* 지구본 이미지 */}
        <Image 
          style={styles.dEarthPng} 
          resizeMode="cover" 
          source={require("../../assets/images/earth.png")} 
        />
        
        {/* Roamie 타이틀 */}
        <Text style={styles.roamie}>Roamie</Text>
        
        {/* 카카오 로그인 버튼 */}
        <View style={styles.child}>
          <TouchableOpacity 
            onPress={() => router.push("/auth/register")}
            style={styles.anotherStepLoginWrapper}
            activeOpacity={0.8}
          >
            <View style={styles.view2}>
              <View style={styles.googleIcon}>
                <KakaoIcon size={scaleW(18)} />
              </View>
              <View style={styles.container1}>
                <Text style={styles.label}>카카오로 시작하기</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        
        {/* 구글 로그인 버튼 */}
        <View style={styles.inner}>
          <TouchableOpacity 
            onPress={() => router.push("/auth/register")}
            style={styles.anotherStepLoginWrapper}
            activeOpacity={0.8}
          >
            <View style={styles.anotherStepLogin}>
              <View style={styles.googleIcon}>
                <GoogleIcon size={scaleW(18)} />
              </View>
              <View style={styles.containerPosition}>
                <Text style={styles.label}>구글로 시작하기</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
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
  dEarthPng: {
    position: "absolute",
    left: "50%",
    marginLeft: scaleW(-100),
    top: scaleH(119),
    width: scaleW(200),
    height: scaleH(150)
  },
  roamie: {
    position: "absolute",
    left: "50%",
    marginLeft: scaleW(-176),
    top: scaleH(306),
    fontSize: font(48),
    lineHeight: font(56),
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    width: scaleW(352),
    fontFamily: "Pretendard"
  },
  inner: {
    position: "absolute",
    width: scaleW(300),
    marginLeft: scaleW(-150),
    left: "50%",
    top: scaleH(462)
  },
  child: {
    position: "absolute",
    width: scaleW(300),
    marginLeft: scaleW(-150),
    left: "50%",
    top: scaleH(385)
  },
  anotherStepLoginWrapper: {
    height: scaleH(48),
    width: scaleW(300)
  },
  anotherStepLogin: {
    borderRadius: scaleW(10),
    top: 0,
    left: 0,
    height: scaleH(48),
    width: scaleW(300),
    position: "absolute",
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    borderStyle: "solid",
    borderColor: "#EFF0F6",
    borderWidth: 1
  },
  view2: {
    borderRadius: scaleW(10),
    top: 0,
    left: 0,
    height: scaleH(48),
    width: scaleW(300),
    position: "absolute",
    overflow: "hidden",
    backgroundColor: "#FEE500"
  },
  googleIcon: {
    top: scaleH(15),
    left: scaleW(14),
    width: scaleW(18),
    height: scaleH(18),
    position: "absolute",
    overflow: "hidden"
  },
  containerPosition: {
    paddingVertical: 0,
    paddingHorizontal: scaleW(86),
    justifyContent: "center",
    marginLeft: scaleW(-136),
    alignItems: "center",
    flexDirection: "row",
    top: scaleH(12),
    left: "50%",
    position: "absolute",
    overflow: "hidden"
  },
  container1: {
    paddingVertical: 0,
    paddingHorizontal: scaleW(86),
    justifyContent: "center",
    marginLeft: scaleW(-136),
    alignItems: "center",
    flexDirection: "row",
    top: scaleH(12),
    left: "50%",
    position: "absolute",
    overflow: "hidden",
    width: scaleW(271)
  },
  label: {
    fontSize: font(15),
    lineHeight: font(23),
    fontWeight: "500",
    color: "#333333",
    textAlign: "center",
    fontFamily: "Pretendard"
  },
  view1: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    flex: 1
  }
});

export default Component;
