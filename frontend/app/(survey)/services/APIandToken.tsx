import AsyncStorage from '@react-native-async-storage/async-storage';
import { api, setToken } from '@/utils/api'; 

// Data Type
interface SurveyResultData {
  travel_type_name: string;
  description: string;
}

/**
 * 설문 결과를 백엔드 서버에 저장하는 함수
 * @param resultData - 저장할 설문 결과 데이터 (이름, 설명)
 * @returns 성공 시 API 응답, 실패 시 에러 throw
 */
export const saveSurveyResultToBackend = async (resultData: SurveyResultData) => {
  try {
    // 1. AsyncStorage에서 JWT 토큰 가져오기
    const token = await AsyncStorage.getItem('jwt_token');

    // 토큰이 없으면 백엔드 호출을 시도하지 않고 함수를 종료합니다.
    if (!token) {
      console.log('로그인 토큰이 없어 백엔드에 저장하지 않습니다.');
      return; 
    }
    
    // API 모듈에 토큰 설정 (기존 로직과 동일)
    setToken(token);
    
    // 2. 백엔드 API 호출
    console.log('백엔드에 설문 결과 저장을 요청합니다...');
    const response = await api('/profile/survey-result', {
      method: 'POST',
      body: JSON.stringify(resultData),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    console.log('백엔드 저장에 성공했습니다.');
    return response; // 성공 결과를 반환

  } catch (error) {
    // 3. API 통신 중 에러가 발생하면 콘솔에 기록
    console.error('백엔드 저장 중 오류가 발생했습니다:', error);
    throw error;
  }
};