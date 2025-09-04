import React from 'react';
import { View, Text, Image, Pressable, ScrollView } from 'react-native';
import CloseSmall from '../../../assets/images/close_small.svg';
import RoundedButtonSmall from './RoundedButtonSmall';
import { Link } from 'expo-router';

type City = {
  id: number;
  name: string;
};

type Props = {
  selectedCities: City[];
  onRemoveCity: (cityId: number) => void;
};

const SelectedCityOverlay = ({ selectedCities, onRemoveCity }: Props) => {
  if (selectedCities.length === 0) return null;

  return (
    <View className="absolute bottom-0 left-0 right-0 bg-[#fafaf8] border-t border-slate-400 h-[120px] z-[1000]">
      <View className="flex-1 relative">
        {/* 선택 완료 버튼 */}
        <View className="absolute top-[52%] left-[5%] right-[5%]">
          <Link href="/(travel)/SelectDate" asChild>
            <RoundedButtonSmall title="선택 완료" />
          </Link>
        </View>

        {/* 선택된 도시들 목록 */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="absolute top-[14px] left-[20px] right-[20px]"
          contentContainerClassName="flex-row space-x-3"
        >
          {selectedCities.map((city, index) => (
            <View key={city.id} className="w-[39px] items-center">
              <Image
                className="w-[30px] h-[30px] z-0"
                resizeMode="cover"
                source={{ uri: "https://placehold.co/30x30" }}
              />
              <View className="h-4 flex-row justify-center items-center p-[10px] self-stretch z-10">
                <Text className="text-[10px] font-light text-[#8b8383] text-center leading-6">
                  {city.name}
                </Text>
              </View>

              {/* 개별 도시 닫기 버튼 */}
              <Pressable 
                onPress={() => onRemoveCity(city.id)} 
                className="absolute w-5 h-5 -top-[6px] left-7 z-20"
              >
                <CloseSmall width={20} height={20} />
              </Pressable>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default SelectedCityOverlay;