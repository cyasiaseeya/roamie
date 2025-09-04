import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import { scaleH, scaleW } from '../../utils/scale';
import SearchBar from './components/SearchBar';
import CategoryTabs from './components/CategoryTabs';
import GenericCityList from './components/GenericCityList';
import SelectedCityOverlay from './components/Overlay';
import { usePlanStore } from './services/usePlanStore';
import * as cities from './data/cities';

// ROAM THE WORLD 컴포넌트
const ROAMTHEWORLD = () => {
  return (
    <Text className="text-gray-700 text-left leading-5">
      <Text className="text-base font-normal">ROAM THE WORLD{'\n'}</Text>
      <Text className="text-xl font-semibold">어디로 여행 가세요?</Text>
    </Text>
  );
};



type City = {
  id: number;
  name: string;
};

const SelectCity = () => {
  const { plan, setCities } = usePlanStore();
  const [selectedCategory, setSelectedCategory] = useState("국내");
  const [selectedCities, setSelectedCities] = useState<City[]>([]);

  // 전역 상태에서 도시 목록을 로컬 상태로 초기화
  useEffect(() => {
    const allCities = Object.values(cities).flat();
    const planCities = plan.cities.map(cityName => 
      allCities.find(city => city.name === cityName)
    ).filter(Boolean) as City[];
    setSelectedCities(planCities);
  }, [plan.cities]);

  // 선택된 도시들을 전역 상태에 저장
  useEffect(() => {
    const cityNames = selectedCities.map(city => city.name);
    setCities(cityNames);
  }, [selectedCities, setCities]);

  // 카테고리별 도시 데이터 매핑
  const getCitiesByCategory = (category: string) => {
    switch (category) {
      case "국내":
        return cities.koreaCities;
      case "일본":
        return cities.japanCities;
      case "중화권":
        return cities.greaterChinaCities;
      case "동남아시아":
        return cities.southeastAsiaCities;
      case "미주":
        return cities.americaCities;
      case "유럽":
        return cities.europeCities;
      case "오세아니아":
        return cities.oceaniaCities;
      case "아시아":
        return cities.otherAsiaCities;
      default:
        return cities.koreaCities;
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleCityToggle = (city: City) => {
    setSelectedCities(prev => {
      const isAlreadySelected = prev.some(selectedCity => selectedCity.id === city.id);
      
      if (isAlreadySelected) {
        // 도시 선택 해제
        return prev.filter(selectedCity => selectedCity.id !== city.id);
      } else {
        // 도시 추가 선택
        return [...prev, city];
      }
    });
  };

  const handleRemoveCity = (cityId: number) => {
    setSelectedCities(prev => prev.filter(city => city.id !== cityId));
  };

  const getSelectedCityIds = () => {
    return selectedCities.map(city => city.id);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        {/* ROAM THE WORLD 텍스트 */}
        <View 
          className="px-5"
          style={{ marginTop: scaleH(80) }}
        >
          <ROAMTHEWORLD />
        </View>

        {/* SearchBar */}
        <View 
          className="px-5"
          style={{ marginTop: scaleH(30) }}
        >
          <SearchBar />
        </View>

        {/* CategoryTabs */}
        <View style={{ marginTop: scaleH(46) }}>
          <CategoryTabs onSelect={handleCategorySelect} />
        </View>

        {/* GenericCityList */}
        <View className="flex-1 mt-5">
          <GenericCityList 
            cities={getCitiesByCategory(selectedCategory)} 
            selectedCityIds={getSelectedCityIds()}
            onCityToggle={handleCityToggle}
          />
        </View>

        {/* 선택된 도시 오버레이 */}
        <SelectedCityOverlay 
          selectedCities={selectedCities}
          onRemoveCity={handleRemoveCity}
        />
      </View>
    </SafeAreaView>
  );
};

export default SelectCity;
