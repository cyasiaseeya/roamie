import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { scaleW, scaleH, font } from '../../../utils/scale';
import Result1 from './ResultTypeA';
import Result2 from './ResultTypeB';
import Result3 from './ResultTypeC';
import Result4 from './ResultTypeD';

interface TieResultProps {
  tiedResults: ('A' | 'B' | 'C' | 'D')[];
  onSelect: (result: 'A' | 'B' | 'C' | 'D') => void;
}

const { width } = Dimensions.get('window');

const TieResult: React.FC<TieResultProps> = ({ tiedResults, onSelect }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateX = useSharedValue(0);

  const resultComponents = {
    A: <Result1 />,
    B: <Result2 />,
    C: <Result3 />,
    D: <Result4 />,
  };

  const resultNames = {
    A: '모험형',
    B: '계획형',
    C: '여유형',
    D: '소통형',
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context: any) => {
      context.startX = translateX.value;
    },
    onActive: (event, context) => {
      translateX.value = context.startX + event.translationX;
    },
    onEnd: (event) => {
      const threshold = width * 0.3;
      
      if (event.translationX > threshold && currentIndex > 0) {
        // 왼쪽으로 스와이프 (이전)
        translateX.value = withSpring(0);
        runOnJS(setCurrentIndex)(currentIndex - 1);
      } else if (event.translationX < -threshold && currentIndex < tiedResults.length - 1) {
        // 오른쪽으로 스와이프 (다음)
        translateX.value = withSpring(0);
        runOnJS(setCurrentIndex)(currentIndex + 1);
      } else {
        // 원래 위치로 복귀
        translateX.value = withSpring(0);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const handleSelect = () => {
    onSelect(tiedResults[currentIndex]);
  };

  return (
    <View style={styles.container}>
      {/* 동률 안내 */}
      <View style={styles.tieNotice}>
        <Text style={styles.tieTitle}>동률입니다. 하나를 선택해주세요</Text>
        
        <Text style={styles.currentResult}>
          {currentIndex + 1} / {tiedResults.length}: {resultNames[tiedResults[currentIndex]]}
        </Text>
      </View>

      {/* 스크롤 가능한 결과 영역 */}
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={styles.gestureContainer}>
          <ScrollView 
            style={styles.scrollContainer} 
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
          >
            <View style={styles.resultContainer}>
              {resultComponents[tiedResults[currentIndex]]}
            </View>
          </ScrollView>
        </Animated.View>
      </PanGestureHandler>

      {/* 선택 버튼 */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.selectButton} onPress={handleSelect}>
          <Text style={styles.selectButtonText}>선택하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  tieNotice: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: scaleW(20),
    paddingVertical: scaleH(20),
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tieTitle: {
    fontSize: font(18),
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: scaleH(15),
    textAlign: 'center',
  },

  currentResult: {
    fontSize: font(16),
    fontWeight: '600',
    color: '#4A90E2',
  },
  gestureContainer: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  resultContainer: {
    flex: 1,
  },
  bottomContainer: {
    paddingHorizontal: scaleW(20),
    paddingVertical: scaleH(20),
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    alignItems: 'center',
  },
  selectButton: {
    backgroundColor: '#007AFF',
    height: scaleH(60),
    borderRadius: scaleW(30),
    justifyContent: 'center',
    alignItems: 'center',
    width: scaleW(327), // 360x800 기준 327px (원래 ResultTypeA와 동일)
    paddingHorizontal: scaleW(40),
  },
  selectButtonText: {
    fontSize: font(18),
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default TieResult;
