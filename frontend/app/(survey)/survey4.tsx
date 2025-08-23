import * as React from "react";
import { Text, View, Image } from "react-native";
import { router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SurveyStyles } from "../../component/SurveyStyles";
import SurveyOption from "../../component/SurveyOptions";

const Survey4 = () => {
  const [selectedOption, setSelectedOption] = React.useState<string>("");

  const handleOptionPress = async (option: string) => {
    setSelectedOption(option);
    
    // AsyncStorage에 답안 저장
    try {
      const existingAnswers = await AsyncStorage.getItem('surveyAnswers');
      const answers = existingAnswers ? JSON.parse(existingAnswers) : {};
      answers.survey4 = option;
      await AsyncStorage.setItem('surveyAnswers', JSON.stringify(answers));
      
      console.log('Survey4 답안 저장:', option);
    } catch (error) {
      console.error('답안 저장 실패:', error);
    }

    // 선택 후 0.5초 뒤에 다음 페이지로 이동
    setTimeout(() => {
      return router.push('/survey5' as any);
    }, 100);
  };

  return (
    <View style={SurveyStyles.root}>
      {/* 질문 */}
      <Text style={SurveyStyles.q}>
        {`Q. 비 때문에 일정이 취소된다면?`}
      </Text>

      {/* 선택지 영역 */}
      <View style={SurveyStyles.groupParent}>
        {/* 공항 이미지 */}
        <Image
          source={require("../../assets/images/Survey4.png")}
          style={[SurveyStyles.essentialAirportSvg, { width: 180, height: 180 }]}
          resizeMode="contain"
        />

        {/* A 선택지 */}
        <SurveyOption
          text="A. 즉흥적으로 다른 활동을 찾는다"
          isSelected={selectedOption === "A"}
          onPress={() => handleOptionPress("A")}
          style={SurveyStyles.rectangleGroup}
          textStyle={SurveyStyles.a}
        />

        {/* B 선택지 */}
        <SurveyOption
          text="B. 실내 박물관이나 전시를 간다."
          isSelected={selectedOption === "B"}
          onPress={() => handleOptionPress("B")}
          style={SurveyStyles.rectangleContainer}
          textStyle={SurveyStyles.a}
        />

        {/* C 선택지 */}
        <SurveyOption
          text="C. 숙소로 돌아가 쉰다."
          isSelected={selectedOption === "C"}
          onPress={() => handleOptionPress("C")}
          style={{top: 321}}
          textStyle={SurveyStyles.c}
        />

        {/* D 선택지 */}
        <SurveyOption
          text="D. 일정을 재조정해 움직인다."
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

export default Survey4;