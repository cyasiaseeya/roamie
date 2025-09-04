import * as React from "react";
import { useState, useEffect } from "react";
import { Text, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scaleW, scaleH, font } from "../../utils/scale"; 
import Bus from '@/assets/images/Bus.svg';
import Car from '@/assets/images/Car.svg';
import Walk from '@/assets/images/Walk.svg';
import { usePlanStore } from './services/usePlanStore';


const SelectTransport = () => {
  const { plan, setTransport } = usePlanStore();
  const [selectedTransport, setSelectedTransport] = useState<'걷기' | '대중교통' | '운전' | null>(null);

  // 전역 상태에서 교통수단 초기화
  useEffect(() => {
    setSelectedTransport(plan.transport);
  }, [plan.transport]);

  // 교통수단 선택 시 전역 상태에 저장
  const handleTransportSelect = (transport: '걷기' | '대중교통' | '운전') => {
    setSelectedTransport(transport);
    setTransport(transport);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#fafaf8]">
      <View style={{ flex: 1, alignItems: 'center', paddingHorizontal: scaleW(16) }}>
        {/* 'Roam the World' Section */}
        <View style={{ marginTop: scaleH(124), alignSelf: 'flex-start' }}>
          <Text style={{ fontSize: font(16), color: '#3f3c3c', lineHeight: scaleH(22) }}>
            ROAM THE WORLD
          </Text>
          <Text style={{ fontSize: font(22), color: '#000', fontWeight: '600', marginTop: scaleH(4), lineHeight: scaleH(22) }}>
            선호하는 이동수단을 알려주세요
          </Text>
        </View>

        {/* Transportation Options Section */}
        <View style={{ marginTop: scaleH(30), width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
          {/* Car Option */}
          <Pressable onPress={() => handleTransportSelect('운전')} style={{ alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ width: scaleW(70), height: scaleH(70), borderRadius: scaleW(100), backgroundColor: selectedTransport === '운전' ? '#116BF4' : '#d9d9d9' }} />
            <Text style={{ marginTop: scaleH(10), fontSize: font(22), fontWeight: '500', color: '#000' }}>자동차</Text>
          </Pressable>
          
          {/* Bus/Subway Option */}
          <Pressable onPress={() => handleTransportSelect('대중교통')} style={{ alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ width: scaleW(70), height: scaleH(70), borderRadius: scaleW(100), backgroundColor: selectedTransport === '대중교통' ? '#116BF4' : '#d9d9d9' }} />
            <Text style={{ marginTop: scaleH(10), fontSize: font(22), fontWeight: '500', color: '#000' }}>대중교통</Text>
          </Pressable>

          {/* Walking Option */}
          <Pressable onPress={() => handleTransportSelect('걷기')} style={{ alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ width: scaleW(70), height: scaleH(70), borderRadius: scaleW(100), backgroundColor: selectedTransport === '걷기' ? '#116BF4' : '#d9d9d9' }} />
            <Text style={{ marginTop: scaleH(10), fontSize: font(22), fontWeight: '500', color: '#000' }}>걷기</Text>
          </Pressable>
        </View>
        
        {/* '계획 생성하기' Button */}
        <Pressable
          style={{
            position: 'absolute',
            bottom: scaleH(200),
            width: scaleW(327),
            height: scaleH(48),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: scaleW(100),
            backgroundColor: '#007AFF',
          }}
        >
          <Text style={{ fontSize: font(17), color: 'white', fontWeight: '600', textAlign: 'center' }}>계획 생성하기</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default SelectTransport;