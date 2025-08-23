import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Result1 from '../../component/ResultTypeA';
import Result2 from '../../component/ResultTypeB';
import Result3 from '../../component/ResultTypeC';
import Result4 from '../../component/ResultTypeD';
import TieResult from '../../component/TieResult';

const SurveyResultPage = () => {
  const [resultComponent, setResultComponent] = useState<React.ReactElement | null>(null);
  const [loading, setLoading] = useState(true);
  const [tiedResults, setTiedResults] = useState<('A' | 'B' | 'C' | 'D')[]>([]);
  const [showTieSelector, setShowTieSelector] = useState(false);

  useEffect(() => {
    calculateAndShowResult();
  }, []);

  const calculateAndShowResult = async () => {
    try {
      // AsyncStorage에서 답변들 가져오기
      const savedAnswers = await AsyncStorage.getItem('surveyAnswers');
      console.log('저장된 답변들:', savedAnswers);
      
      if (savedAnswers) {
        const answers = JSON.parse(savedAnswers);
        console.log('파싱된 답변들:', answers);
        const { result, tied } = calculateResult(answers);
        console.log('계산된 결과:', result, '동률 결과들:', tied);
        
        if (result === 'TIE' && tied) {
          // 동률인 경우
          setTiedResults(tied);
          setShowTieSelector(true);
        } else {
          // 단일 결과인 경우
          setResultComponent(getResultComponent(result as 'A' | 'B' | 'C' | 'D'));
        }
      } else {
        console.log('저장된 답변이 없습니다');
        // 기본값
        setResultComponent(getResultComponent('A'));
      }
    } catch (error) {
      console.error('답변 불러오기 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateResult = (answers: Record<string, string>): { result: 'A' | 'B' | 'C' | 'D' | 'TIE', tied?: ('A' | 'B' | 'C' | 'D')[] } => {
    const counts = { A: 0, B: 0, C: 0, D: 0 };
    
    // 답변 객체를 순회하면서 카운트
    Object.values(answers).forEach((answer: string) => {
      if (answer in counts) {
        counts[answer as keyof typeof counts]++;
      }
    });
    
    // 가장 많은 답변 찾기
    const maxCount = Math.max(...Object.values(counts));
    
    // 동률인 결과들 찾기
    const tiedResults = (Object.keys(counts) as Array<keyof typeof counts>).filter(
      key => counts[key] === maxCount && maxCount > 0
    );
    
    console.log('점수:', counts);
    console.log('최고 점수:', maxCount);
    console.log('동률 결과들:', tiedResults);
    
    // 동률이면 'TIE' 반환
    if (tiedResults.length > 1) {
      return { result: 'TIE', tied: tiedResults };
    }
    
    return { result: tiedResults[0] || 'A' };
  };

  const getResultComponent = (result: 'A' | 'B' | 'C' | 'D') => {
    const components = {
      A: <Result1 />,
      B: <Result2 />,
      C: <Result3 />,
      D: <Result4 />
    };
    
    return components[result];
  };

  const handleTieSelection = (selectedResult: 'A' | 'B' | 'C' | 'D') => {
    setShowTieSelector(false);
    setResultComponent(getResultComponent(selectedResult));
  };

  if (loading) {
    return <View><Text>결과 계산 중...</Text></View>;
  }

  if (showTieSelector) {
    return (
      <TieResult 
        tiedResults={tiedResults}
        onSelect={handleTieSelection}
      />
    );
  }

  return (
    <View>
      {resultComponent}
    </View>
  );
};

export default SurveyResultPage;