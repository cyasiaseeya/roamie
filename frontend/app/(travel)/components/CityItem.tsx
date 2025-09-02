import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import CheckIcon from "@/assets/images/check.svg";
import CheckIntermediateIcon from "@/assets/images/check_indeterminate_small.svg";


type Props = {
  name: string;
  selected?: boolean;
  onPress?: () => void;
};

export default function CityItem({ name, selected, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center px-4 py-3 relative"
    >
      {/* 이미지 (placeholder) */}
      <Image
        source={{ uri: "https://placehold.co/40x40" }}
        className="w-10 h-10 rounded-full mr-3"
      />

      {/* 도시 이름 */}
      <Text className="text-black text-lg font-normal">{name}</Text>

      {/* 체크 or 중간 상태 아이콘 */}
      <View className="absolute right-10">
        {selected ? (
          <CheckIcon width={20} height={20} />
        ) : (
          <CheckIntermediateIcon width={20} height={20} />
        )}
      </View>
    </Pressable>
  );
}
