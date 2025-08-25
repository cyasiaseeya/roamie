import React from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text, ViewStyle, TextStyle, ImageStyle, ScrollView } from "react-native";
import { router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { scaleW, scaleH, font } from "../../../utils/scale";

const ResultTypeB = () => {
  const resetSurvey = async () => {
    try {
      await AsyncStorage.removeItem('surveyAnswers');
      router.push('/survey1');
    } catch (error) {
      console.error('데이터 초기화 실패:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        
        {/* 이미지 영역 */}
        <View style={styles.imageSection}>
          <Image 
            source={require("../../../assets/images/SurveyResult2.png")}
            style={styles.earthImage}
            resizeMode="contain"
          />
        </View>
        
        {/* 제목 영역 */}
        <View style={styles.titleSection}>
          <Text style={styles.titleText}>문화형</Text>
        </View>
        
        {/* 설명 텍스트 영역 */}
        <View style={styles.descriptionSection}>
          <Text style={styles.descriptionText}>
            여행지의 역사, 예술, 현지인과의 교류 등 문화적 요소에 관심이 많은 유형입니다. 정보를 확인하거나 체험하며, 그에 담긴 의미나 배경을 알아가는 것을 즐깁니다.
          </Text>
        </View>
        
        {/* 확장 영역 (여백) */}
        <View style={styles.spacerSection}>
        </View>
        
        {/* 버튼 영역 */}
        <TouchableOpacity 
          style={styles.confirmButton}
          onPress={resetSurvey}
        >
          <Text style={styles.confirmButtonText}>확인했습니다</Text>
        </TouchableOpacity>
        
      </ScrollView>
    </View>
  );
};

interface Styles {
  container: ViewStyle;
  scrollView: ViewStyle;
  contentContainer: ViewStyle;
  imageSection: ViewStyle;
  earthImage: ImageStyle;
  titleSection: ViewStyle;
  titleText: TextStyle;
  descriptionSection: ViewStyle;
  descriptionText: TextStyle;
  spacerSection: ViewStyle;
  confirmButton: ViewStyle;
  confirmButtonText: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: scaleH(50),
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: scaleW(20),
    paddingBottom: scaleH(20), // 하단 여백 추가
  },
  imageSection: {
    height: scaleH(270), // Figma에서는 270px 높이
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scaleH(10),
  },
  earthImage: {
    width: scaleW(270), // 전체 너비 사용
    height: scaleH(270),
  },
  titleSection: {
    height: scaleH(70),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scaleH(20),
  },
  titleText: {
    fontSize: font(32), // Figma에서는 32px
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    fontFamily: 'Pretendard',
    lineHeight: font(40), // 26 → 40으로 증가
    includeFontPadding: false, // 폰트 패딩 제거
  },
  descriptionSection: {
    minHeight: scaleH(145), // Figma에서는 145px 높이
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scaleH(20),
    paddingHorizontal: scaleW(20),
  },
  descriptionText: {
    fontSize: font(16),
    fontWeight: '500',
    color: '#000000',
    textAlign: 'left', // Figma에서는 왼쪽 정렬
    lineHeight: font(24),
    fontFamily: 'Pretendard',
    width: scaleW(255), // 고정 너비
  },
  spacerSection: {
    flex: 1,
    minHeight: scaleH(50),
  },
  confirmButton: {
    backgroundColor: '#4A90E2', // 파란색 버튼
    height: scaleH(47), // Figma 높이
    borderRadius: scaleW(100), // 완전히 둥근 버튼
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scaleH(30),
    width: scaleW(327), // 360x800 기준 327px
    alignSelf: 'center',
  },
  confirmButtonText: {
    fontSize: font(17),
    fontWeight: '600',
    color: '#F2F2F7', // Figma 색상
    textAlign: 'center',
    fontFamily: 'SF Pro',
    lineHeight: font(24),
  },
});

export default ResultTypeB;