import * as React from "react";
import { Text, View } from "react-native";
import { router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SurveyStyles } from "./components/SurveyStyles";
import SurveyOption from "./components/SurveyOptions";
import EssentialAirportSvg from "../../assets/images/Survey8.svg";

const Survey8 = () => {
  const [selectedOption, setSelectedOption] = React.useState<string>("");

  const handleOptionPress = async (option: string) => {
    setSelectedOption(option);
    
    // AsyncStorage에 답안 저장
    try {
      const existingAnswers = await AsyncStorage.getItem('surveyAnswers');
      const answers = existingAnswers ? JSON.parse(existingAnswers) : {};
      answers.survey8 = option;
      await AsyncStorage.setItem('surveyAnswers', JSON.stringify(answers));
      
      console.log('Survey8 답안 저장:', option);
    } catch (error) {
      console.error('답안 저장 실패:', error);
    }

    // 선택 후 0.1초 뒤에 다음 페이지로 이동
    setTimeout(() => {
      return router.push('/survey9' as any);
    }, 100);
  };

  return (
    <View style={SurveyStyles.root}>
      {/* 질문 */}
      <Text style={SurveyStyles.q}>
        {`Q. 관광객이 없는 역사적인 지역에\n도착했다면?`}
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
          text="A. 지도 없이 골목을 돌아다닌다"
          isSelected={selectedOption === "A"}
          onPress={() => handleOptionPress("A")}
          style={SurveyStyles.rectangleGroup}
          textStyle={SurveyStyles.a}
        />

        {/* B 선택지 */}
        <SurveyOption
          text="B. 안내문이나 유적 설명을 읽는다"
          isSelected={selectedOption === "B"}
          onPress={() => handleOptionPress("B")}
          style={SurveyStyles.rectangleContainer}
          textStyle={SurveyStyles.a}
        />

        {/* C 선택지 */}
        <SurveyOption
          text="C. 조용한 곳에 앉아 분위기를 즐긴다"
          isSelected={selectedOption === "C"}
          onPress={() => handleOptionPress("C")}
          style={{top: 321}}
          textStyle={SurveyStyles.c}
        />

        {/* D 선택지 */}
        <SurveyOption
          text="D. 방문 시간과 체크리스트를 확인한다"
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

export default Survey8;