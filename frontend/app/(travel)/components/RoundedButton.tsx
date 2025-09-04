import React from "react";
import { Pressable, Text, ViewStyle } from "react-native";
import { font , scaleH, scaleW } from "@/utils/scale";
interface RoundedButtonProps {
  title: string;
  onPress?: () => void;
  style?: ViewStyle;
}



export default function RoundedButton({ title, onPress, style }: RoundedButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      className="bg-[#116BF4] rounded-full"
      style={[
        {
          height: scaleH(48),
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: scaleW(16), // 글자 길이 대비 여백
        },
        style,
      ]}
    >
      <Text
        style={{
          fontSize: font(17),
          color: "white",
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        {title}
      </Text>
    </Pressable>
  );
}