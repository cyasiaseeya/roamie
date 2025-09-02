import * as React from 'react';
import { View, Image, Text, Pressable, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scaleW, scaleH, font } from "../../utils/scale";
import Taegeuk from '@/assets/images/Taegeuk.svg';

const SelectMoney = () => {
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
            <Taegeuk
              width={scaleW(45)}
              height={scaleH(45)}
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
            />
            <View style={{ justifyContent: 'center', padding: scaleW(10) }}>
              <Text className="text-[16px] text-black font-semibold text-center leading-[24px]">KRW</Text>
            </View>
          </View>
        </View>

        {/* '확인했습니다' Button Section */}
        <View className="absolute bottom-0 left-4 right-4" style={{ bottom: scaleH(197) }}>
          <Pressable
            className="bg-[#116BF4] py-3 rounded-full"
            style={{
              height: scaleH(48),
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text className="text-[17px] text-white font-semibold text-center leading-[24px]">확인했습니다</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SelectMoney;