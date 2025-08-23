import * as React from "react";
import { Text, View, Image } from "react-native";
import { router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SurveyStyles } from "../../component/SurveyStyles";
import SurveyOption from "../../component/SurveyOptions";

const Survey5 = () => {
  const [selectedOption, setSelectedOption] = React.useState<string>("");

  const handleOptionPress = async (option: string) => {
    setSelectedOption(option);
    
    // AsyncStorage에 답안 저장
    try {
      const existingAnswers = await AsyncStorage.getItem('surveyAnswers');
      const answers = existingAnswers ? JSON.parse(existingAnswers) : {};
      answers.survey5 = option;
      await AsyncStorage.setItem('surveyAnswers', JSON.stringify(answers));
      
      console.log('Survey5 답안 저장:', option);
    } catch (error) {
      console.error('답안 저장 실패:', error);
    }

    // 선택 후 0.1초 뒤에 다음 페이지
    setTimeout(() => {
      return router.push('/survey6' as any);
    }, 100);
  };

  return (
    <View style={SurveyStyles.root}>
      {/* 질문 */}
      <Text style={SurveyStyles.q}>
        {`Q. 친구와 가고 싶은 곳이 다를 때?`}
      </Text>

      {/* 선택지 영역 */}
      <View style={SurveyStyles.groupParent}>
        {/* 공항 이미지 */}
        <Image
          source={require("../../assets/images/Survey5.png")}
          style={[SurveyStyles.essentialAirportSvg, { width: 180, height: 180 }]}
          resizeMode="contain"
        />

        {/* A 선택지 */}
        <SurveyOption
          text="A. 내가 하고 싶은 걸 권유한다"
          isSelected={selectedOption === "A"}
          onPress={() => handleOptionPress("A")}
          style={SurveyStyles.rectangleGroup}
          textStyle={SurveyStyles.a}
        />

        {/* B 선택지 */}
        <SurveyOption
          text="B. 서로의 관심사를 조율한다"
          isSelected={selectedOption === "B"}
          onPress={() => handleOptionPress("B")}
          style={SurveyStyles.rectangleContainer}
          textStyle={SurveyStyles.a}
        />

        {/* C 선택지 */}
        <SurveyOption
          text="C. 다 같이 쉴 수 있는 곳을 제안한다"
          isSelected={selectedOption === "C"}
          onPress={() => handleOptionPress("C")}
          style={{top: 321}}
          textStyle={SurveyStyles.c}
        />

        {/* D 선택지 */}
        <SurveyOption
          text="D. 일정을 재배치 조율한다"
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

export default Survey5;