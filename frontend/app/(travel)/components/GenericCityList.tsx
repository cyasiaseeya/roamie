import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CityItem from "./CityItem";

// FlatList -> 방대한 데이터 쓸 때 좋음
type City = {
  id: number;
  name: string;
};

type Props = {
  cities: City[];
};

export default function GenericCityList({ cities }: Props) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={cities}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CityItem
            name={item.name}
            selected={selectedId === item.id}
            onPress={() => setSelectedId(item.id)}
          />
        )}
      />
    </View>
  );
}