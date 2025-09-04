import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { scaleW } from '@/utils/scale';

// 1. 각 카테고리 이름 뒤의 불필요한 공백을 제거했습니다.
const categories = ["국내", "일본", "중화권", "동남아시아", "미주", "유럽", "오세아니아", "아시아"];

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
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContent} // contentContainerStyle 사용
    >
      {/* 2. .map() 함수에서 index를 가져옵니다. */}
      {categories.map((cat, idx) => (
        <Pressable
          key={cat}
          onPress={() => handlePress(cat)}
          // 3. 마지막 요소가 아닐 경우에만 오른쪽 마진을 줍니다.
          style={{ marginRight: idx === categories.length - 1 ? 0 : scaleW(18) }}
        >
          <Text style={[styles.text, active === cat && styles.activeText]}>
            {cat}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

// 4. 스타일을 StyleSheet로 관리합니다.
const styles = StyleSheet.create({
  scrollView: {
    marginTop: 12, // mt-3
    flexGrow: 0,
  },
  scrollViewContent: {
    paddingHorizontal: 20, // px-5
  },
  text: {
    color: "#4B5563", // text-gray-600
    fontSize: 16,
  },
  activeText: {
    color: "#3B82F6", // text-blue-500
    fontWeight: 'bold',
  },
});