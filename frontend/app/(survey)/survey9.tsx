import * as React from "react";
import { Text, View } from "react-native";
import { router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SurveyStyles } from "../../component/SurveyStyles";
import SurveyOption from "../../component/SurveyOptions";
import EssentialAirportSvg from "../../assets/images/Survey9.svg";

const Survey9 = () => {
  const [selectedOption, setSelectedOption] = React.useState<string>("");

  const handleOptionPress = async (option: string) => {
    setSelectedOption(option);
    
    // AsyncStorage에 답안 저장
    try {
      const existingAnswers = await AsyncStorage.getItem('surveyAnswers');
      const answers = existingAnswers ? JSON.parse(existingAnswers) : {};
      answers.survey9 = option;
      await AsyncStorage.setItem('surveyAnswers', JSON.stringify(answers));
      
      console.log('Survey9 답안 저장:', option);
    } catch (error) {
      console.error('답안 저장 실패:', error);
    }

    // 선택 후 0.1초 뒤에 다음 페이지로 이동
    setTimeout(() => {
      return router.push('/survey10' as any);
    }, 100);
  };

  return (
    <View style={SurveyStyles.root}>
      {/* 질문 */}
      <Text style={SurveyStyles.q}>
        {`Q. 인기 액티비티 자리가 얼마 없다면?`}
      </Text>

      {/* 선택지 영역 */}
      <View style={SurveyStyles.groupParent}>
        {/* 공항 이미지 */}
        <EssentialAirportSvg
          style={SurveyStyles.essentialAirportSvg}
          width={180}
          height={180}
        />

        {/* A 선택지 */}
        <SurveyOption
          text="A. 바로 예약한다"
          isSelected={selectedOption === "A"}
          onPress={() => handleOptionPress("A")}
          style={SurveyStyles.rectangleGroup}
          textStyle={SurveyStyles.a}
        />

        {/* B 선택지 */}
        <SurveyOption
          text="B. 의미나 전통을 더 알아본다"
          isSelected={selectedOption === "B"}
          onPress={() => handleOptionPress("B")}
          style={SurveyStyles.rectangleContainer}
          textStyle={SurveyStyles.a}
        />

        {/* C 선택지 */}
        <SurveyOption
          text="C. 경쟁을 피하고 쉬운 걸 선택한다"
          isSelected={selectedOption === "C"}
          onPress={() => handleOptionPress("C")}
          style={{top: 321}}
          textStyle={SurveyStyles.c}
        />

        {/* D 선택지 */}
        <SurveyOption
          text="D. 다른 일정과 충돌 여부를 먼저 본다"
          isSelected={selectedOption === "D"}
          onPress={() => handleOptionPress("D")}
          style={SurveyStyles.rectangleParent}
          textStyle={SurveyStyles.d}
        />
      </View>

      {/* 하단 페이지 인디케이터 */}
      <View style={SurveyStyles.going}>
        <View style={SurveyStyles.groupView}>
          <View style={SurveyStyles.dotActive} />
          <View style={SurveyStyles.dot} />
          <View style={SurveyStyles.dot} />
        </View>
      </View>
    </View>
  );
};

export default Survey9;