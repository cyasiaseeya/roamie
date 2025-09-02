import * as React from "react";
import { useState } from "react";
import { Text, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scaleW, scaleH, font } from "../../utils/scale"; 
const SelectTransport = () => {
  const [selectedTransport, setSelectedTransport] = useState<'car' | 'bus' | 'walk' | null>(null);

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
          <Pressable onPress={() => setSelectedTransport('car')} style={{ alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ width: scaleW(70), height: scaleH(70), borderRadius: scaleW(100), backgroundColor: selectedTransport === 'car' ? '#116BF4' : '#d9d9d9' }} />
            <Text style={{ marginTop: scaleH(10), fontSize: font(22), fontWeight: '500', color: '#000' }}>자동차</Text>
          </Pressable>
          
          {/* Bus/Subway Option */}
          <Pressable onPress={() => setSelectedTransport('bus')} style={{ alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ width: scaleW(70), height: scaleH(70), borderRadius: scaleW(100), backgroundColor: selectedTransport === 'bus' ? '#116BF4' : '#d9d9d9' }} />
            <Text style={{ marginTop: scaleH(10), fontSize: font(22), fontWeight: '500', color: '#000' }}>대중교통</Text>
          </Pressable>

          {/* Walking Option */}
          <Pressable onPress={() => setSelectedTransport('walk')} style={{ alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ width: scaleW(70), height: scaleH(70), borderRadius: scaleW(100), backgroundColor: selectedTransport === 'walk' ? '#116BF4' : '#d9d9d9' }} />
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