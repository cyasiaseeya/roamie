import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import { Link } from "expo-router";

export default function Register() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 px-6 pt-8">
          {/* Header */}
          <View className="mb-8">
            <Text className="text-2xl font-bold text-gray-900 mb-2">회원가입</Text>
            <Text className="text-gray-600">ROMIE에 오신 것을 환영합니다</Text>
          </View>

          {/* Form */}
          <View className="space-y-4">
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2">이름</Text>
              <TextInput
                className="w-full h-14 border border-gray-200 rounded-xl px-4 bg-gray-50"
                placeholder="이름을 입력하세요"
                autoCapitalize="words"
              />
            </View>

            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2">이메일</Text>
              <TextInput
                className="w-full h-14 border border-gray-200 rounded-xl px-4 bg-gray-50"
                placeholder="이메일을 입력하세요"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2">비밀번호</Text>
              <TextInput
                className="w-full h-14 border border-gray-200 rounded-xl px-4 bg-gray-50"
                placeholder="비밀번호를 입력하세요"
                secureTextEntry
              />
            </View>

            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2">비밀번호 확인</Text>
              <TextInput
                className="w-full h-14 border border-gray-200 rounded-xl px-4 bg-gray-50"
                placeholder="비밀번호를 다시 입력하세요"
                secureTextEntry
              />
            </View>
          </View>

          {/* Terms */}
          <View className="mt-6 mb-8">
            <View className="flex-row items-start space-x-3">
              <TouchableOpacity className="w-5 h-5 border border-gray-300 rounded mt-0.5">
                {/* Checkbox placeholder */}
              </TouchableOpacity>
              <Text className="text-sm text-gray-600 flex-1">
                <Text>이용약관 및 </Text>
                <Text className="text-blue-500">개인정보처리방침</Text>
                <Text>에 동의합니다</Text>
              </Text>
            </View>
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity className="w-full h-14 bg-blue-500 rounded-xl justify-center items-center mb-6">
            <Text className="text-white font-semibold text-lg">회원가입</Text>
          </TouchableOpacity>

          {/* Login Link */}
          <View className="flex-row justify-center items-center">
            <Text className="text-gray-600">이미 계정이 있으신가요? </Text>
            <Link href="/login">
              <Text className="text-blue-500 font-medium">로그인</Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
