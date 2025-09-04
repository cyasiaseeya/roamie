import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Result1 from './components/ResultTypeA';
import Result2 from './components/ResultTypeB';
import Result3 from './components/ResultTypeC';
import Result4 from './components/ResultTypeD';
import TieResult from './components/TieResult';
import {saveSurveyResultToBackend} from './services/APIandToken';


const SurveyResultPage = () => {
  const [resultComponent, setResultComponent] = useState<React.ReactElement | null>(null);
  const [loading, setLoading] = useState(true);
  const [tiedResults, setTiedResults] = useState<('A' | 'B' | 'C' | 'D')[]>([]);
  const [showTieSelector, setShowTieSelector] = useState(false);

  useEffect(() => {
    calculateAndShowResult();
  }, []);

  const resultNames = {
    A: '모험형',
    B: '문화형',
    C: '휴식형',
    D: '계획형',
  };

  const resultDescriptions = {
    A: '새로운 경험을 추구하고, 즉흥적인 선택과 탐험을 즐기는 유형입니다. 낯선 장소나 활동에도 두려움 없이 뛰어들며, 계획에 얽매이지 않고 다양한 상황을 스스로 개척합니다.',
    B: '여행지의 역사, 예술, 현지인과의 교류 등 문화적 요소에 관심이 많은 유형입니다. 정보를 확인하거나 체험하며, 그에 담긴 의미나 배경을 알아가는 것을 즐깁니다.',
    C: '여행 중에도 편안함과 여유를 우선시하는 유형입니다. 카페, 공원, 숙소 등에서 휴식을 취하거나, 심신의 안정을 도모하는 활동을 선호합니다. 때로 활동보다는 느긋하게 쉬는 것을 더 중요하게 생각합니다.',
    D: '일정과 준비를 중시하는 체계적인 유형입니다. 여행의 모든 순간을 미리 계획하고, 시간과 동선, 상황에 따라 꼼꼼하게 움직입니다. 예상치 못한 상황에도 절차대로 차분히 대응합니다.',
  };
  
  const saveResult = async (result: 'A' | 'B' | 'C' | 'D') => {
    const resultDataForBackend = {
      travel_type_name: resultNames[result],
      description: resultDescriptions[result],
    };

    const resultDataForLocal = {
      ...resultDataForBackend,
      travel_type: result,
    };

    try {
      // 1. 분리된 백엔드 통신 함수 호출
      await saveSurveyResultToBackend(resultDataForBackend);
    } catch (error) {
      // 백엔드 저장은 실패했지만, 로컬 저장은 계속 진행합니다.
      console.log('백엔드 통신에 실패했습니다. 로컬 저장만 진행합니다.');
    }

    // 2. 백엔드 저장 성공 여부와 관계없이 항상 로컬에 저장 (백업용)
    try {
      await AsyncStorage.setItem('surveyResult', JSON.stringify(resultDataForLocal));
      console.log('로컬 저장이 완료되었습니다.');
    } catch (localError) {
      console.error('로컬 저장에도 실패했습니다:', localError);
    }
  };
  

  const calculateAndShowResult = async () => {
    try {
      // AsyncStorage에서 답변들 가져오기
      const savedAnswers = await AsyncStorage.getItem('surveyAnswers');

      
      if (savedAnswers) {
        const answers = JSON.parse(savedAnswers);
        const { result, tied } = calculateResult(answers);
        
        if (result === 'TIE' && tied) {
          // 동률인 경우
          setTiedResults(tied);
          setShowTieSelector(true);
        } else {
          // 단일 결과인 경우
          const finalResult = result as 'A' | 'B' | 'C' | 'D';
          await saveResult(finalResult);
          setResultComponent(getResultComponent(finalResult));
        }
      } else {
        // 기본값
        setResultComponent(getResultComponent('A'));
      }
    } catch (error) {
      // Handle error silently
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

  const handleTieSelection = async (selectedResult: 'A' | 'B' | 'C' | 'D') => {
    setShowTieSelector(false);
    await saveResult(selectedResult);
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
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      {resultComponent || <Text>컴포넌트가 없습니다</Text>}
    </View>
  );
};

export default SurveyResultPage;