import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

const categories = ["국내", "일본", "중화권", "동남아시아", "미주", "유럽", "오세아니아", "아시아"] ;

type Props = {
  onSelect: (category: string) => void;
};

export default function CategoryTabs({ onSelect }: Props) {
  const [active, setActive] = useState("국내");

  const handlePress = (cat: string) => {
    setActive(cat);
    onSelect(cat);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mt-3 px-4"
    >
      <View className="flex-row space-x-4">
        {categories.map((cat) => (
          <Pressable key={cat} onPress={() => handlePress(cat)}>
            <Text
              className={`${
                active === cat ? "text-blue-500 font-bold" : "text-gray-600"
              }`}
            >
              {cat}
            </Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({})