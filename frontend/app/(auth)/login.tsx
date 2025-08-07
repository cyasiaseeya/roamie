import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, Image } from "react-native";
import { Link } from "expo-router";

const { width, height } = Dimensions.get('window');

export default function Login() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#3b82f6' }}>
             {/* Background with Globe Illustration */}
       <View style={{ 
         position: 'absolute', 
         top: 0, 
         left: 0, 
         right: 0, 
         height: height * 0.5,
         backgroundColor: '#3b82f6',
         justifyContent: 'flex-end',
         alignItems: 'center',
         paddingBottom: height * 0.1
       }}>
                {/* 3D Earth Image */}
        <Image
          source={require('../../assets/images/3d - earth (PNG).png')}
          style={{
            width: Math.min(width * 0.8, 300),
            height: Math.min(width * 0.8, 300),
            resizeMode: 'contain'
          }}
        />
      </View>

             {/* Login Card */}
       <View style={{ 
         flex: 1, 
         justifyContent: 'flex-end', 
         paddingHorizontal: Math.min(width * 0.06, 24),
         paddingBottom: height * 0.05
       }}>
        <View style={{
          backgroundColor: 'white',
          borderRadius: 20,
          padding: Math.min(width * 0.06, 24),
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 8
        }}>
          {/* Header */}
          <View style={{ alignItems: 'center', marginBottom: height * 0.04 }}>
            <Text style={{ 
              fontSize: Math.min(width * 0.08, 32), 
              fontWeight: 'bold', 
              color: '#1f2937', 
              marginBottom: height * 0.02 
            }}>로그인</Text>
          </View>

          {/* Form */}
          <View style={{ marginBottom: height * 0.03 }}>
            <View style={{ marginBottom: height * 0.03 }}>
              <Text style={{ 
                fontSize: Math.min(width * 0.04, 16), 
                fontWeight: '500', 
                color: '#374151', 
                marginBottom: height * 0.01 
              }}>아이디</Text>
              <TextInput
                style={{
                  width: '100%',
                  height: Math.min(height * 0.06, 48),
                  borderWidth: 1,
                  borderColor: '#e5e7eb',
                  borderRadius: 8,
                  paddingHorizontal: Math.min(width * 0.04, 16),
                  backgroundColor: '#f9fafb',
                  fontSize: Math.min(width * 0.04, 16)
                }}
                placeholder="아이디를 입력하세요"
                autoCapitalize="none"
              />
            </View>

            <View style={{ marginBottom: height * 0.03 }}>
              <Text style={{ 
                fontSize: Math.min(width * 0.04, 16), 
                fontWeight: '500', 
                color: '#374151', 
                marginBottom: height * 0.01 
              }}>비밀번호</Text>
              <TextInput
                style={{
                  width: '100%',
                  height: Math.min(height * 0.06, 48),
                  borderWidth: 1,
                  borderColor: '#e5e7eb',
                  borderRadius: 8,
                  paddingHorizontal: Math.min(width * 0.04, 16),
                  backgroundColor: '#f9fafb',
                  fontSize: Math.min(width * 0.04, 16)
                }}
                placeholder="비밀번호를 입력하세요"
                secureTextEntry
              />
            </View>
          </View>

          {/* Remember ID and Forgot Password */}
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: height * 0.04 
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{
                width: 20,
                height: 20,
                borderWidth: 1,
                borderColor: '#d1d5db',
                borderRadius: 4,
                marginRight: 8
              }} />
              <Text style={{ 
                color: '#6b7280',
                fontSize: Math.min(width * 0.035, 14)
              }}>아이디 기억하기</Text>
            </View>
            <Link href="/forgot-password">
              <Text style={{ 
                color: '#3b82f6', 
                fontSize: Math.min(width * 0.035, 14)
              }}>비밀번호 찾기</Text>
            </Link>
          </View>

          {/* Login Button */}
          <TouchableOpacity 
            style={{
              width: '100%',
              height: Math.min(height * 0.06, 48),
              backgroundColor: '#3b82f6',
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: height * 0.03
            }}
          >
            <Text style={{ 
              color: 'white', 
              fontWeight: '600', 
              fontSize: Math.min(width * 0.045, 18) 
            }}>로그인</Text>
          </TouchableOpacity>

          {/* Register Link */}
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ 
              color: '#6b7280',
              fontSize: Math.min(width * 0.04, 16)
            }}>계정이 없나요? </Text>
            <Link href="/register">
              <Text style={{ 
                color: '#3b82f6', 
                fontWeight: '500',
                fontSize: Math.min(width * 0.04, 16)
              }}>회원가입</Text>
            </Link>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
