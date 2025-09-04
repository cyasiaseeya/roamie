import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scaleW, scaleH } from "../../utils/scale";
import SouthKoreaFlag from '@/assets/images/South Korea.svg';
import RoundedButton from './components/RoundedButton';
import { usePlanStore } from './services/usePlanStore';

const SelectMoney = () => {
  const { plan, setBudget } = usePlanStore();
  const [budget, setBudgetLocal] = useState(plan.budget.toString());

  // 전역 상태에서 예산 초기화
  useEffect(() => {
    setBudgetLocal(plan.budget.toString());
  }, [plan.budget]);

  // 예산 변경 시 전역 상태에 저장
  const handleBudgetChange = (value: string) => {
    setBudgetLocal(value);
    const numericValue = parseInt(value.replace(/,/g, '')) || 0;
    setBudget(numericValue);
  };

  // 숫자 포맷팅 (콤마 추가)
  const formatNumber = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-white px-4">
        {/* 'Roam the World' Section */}
        <View style={{ marginTop: scaleH(64) }}>
          <Text className="text-[16px] text-[#3f3c3c] leading-[22px] font-pretendard">
            ROAM THE WORLD
          </Text>
          <Text className="text-[20px] text-black font-semibold mt-[4px] font-pretendard">
            대략적인 예산을 알려주세요
          </Text>
        </View>

        {/* Currency Input Section */}
        <View style={{ marginTop: scaleH(124) }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: scaleH(70),
              borderRadius: scaleW(8),
              backgroundColor: '#d9d9d9',
              paddingHorizontal: scaleW(17),
              paddingVertical: scaleH(12),
            }}
          >
            <SouthKoreaFlag
              width={scaleW(45)}
              height={scaleH(45)}
              style={{ borderRadius: 80 }}
            />

            <TextInput
              style={{
                flex: 1,
                fontSize: 20,
                color: 'black',
                textAlign: 'right',
                paddingRight: scaleW(10),
              }}
              placeholder="예산 입력"
              keyboardType="numeric"
              returnKeyType="done"
              placeholderTextColor="#888"
              value={formatNumber(budget)}
              onChangeText={handleBudgetChange}
            />
            <View style={{ justifyContent: 'center', padding: scaleW(10) }}>
              <Text className="text-[16px] text-black font-semibold text-center leading-[24px]">KRW</Text>
            </View>
          </View>
        </View>

        {/* '확인했습니다' Button Section */}
        <View className="absolute bottom-0 left-4 right-4" style={{ bottom: scaleH(197) }}>
          <Link href="/(travel)/SelectTransport" asChild>
            <RoundedButton title="확인했습니다" />
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SelectMoney;
