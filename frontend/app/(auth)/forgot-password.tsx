import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function ForgotPassword() {
  return (
    <View className="flex-1 justify-center items-center px-6 bg-white">
      <View className="w-full max-w-sm">
        <Text className="text-3xl font-bold text-center mb-8">비밀번호 찾기</Text>
        
        <Text className="text-gray-600 text-center mb-6">
          가입한 이메일 주소를 입력하시면 비밀번호 재설정 링크를 보내드립니다.
        </Text>
        
        <TextInput
          className="w-full h-12 border border-gray-300 rounded-lg px-4 mb-6"
          placeholder="이메일"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <TouchableOpacity className="w-full h-12 bg-blue-500 rounded-lg justify-center items-center mb-4">
          <Text className="text-white font-semibold">비밀번호 재설정 링크 보내기</Text>
        </TouchableOpacity>
        
        <Link href="/login" className="text-center text-blue-500">
          로그인으로 돌아가기
        </Link>
      </View>
    </View>
  );
}
