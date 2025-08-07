import { useEffect } from "react";
import { View, Text, SafeAreaView, Dimensions } from "react-native";
import { router } from "expo-router";

const { width, height } = Dimensions.get('window');

export default function Index() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/(auth)/login");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8fafc' }}>
      <View style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        paddingHorizontal: Math.min(width * 0.06, 24)
      }}>
        {/* Logo/Brand */}
        <View style={{ alignItems: 'center', marginBottom: height * 0.06 }}>
          <View style={{ 
            width: Math.min(width * 0.3, 128), 
            height: Math.min(width * 0.3, 128), 
            backgroundColor: '#3b82f6', 
            borderRadius: Math.min(width * 0.15, 64), 
            marginBottom: height * 0.04, 
            alignItems: 'center', 
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 8
          }}>
            <Text style={{ 
              color: 'white', 
              fontSize: Math.min(width * 0.12, 48), 
              fontWeight: 'bold' 
            }}>R</Text>
          </View>
          <Text style={{ 
            fontSize: Math.min(width * 0.12, 48), 
            fontWeight: 'bold', 
            color: '#1f2937', 
            marginBottom: height * 0.015 
          }}>ROMIE</Text>
          <Text style={{ 
            fontSize: Math.min(width * 0.05, 20), 
            color: '#6b7280', 
            textAlign: 'center', 
            lineHeight: Math.min(width * 0.07, 28),
            paddingHorizontal: width * 0.1
          }}>
            당신의 여행을 더 특별하게
          </Text>
        </View>

        {/* Loading Indicator */}
        <View style={{ alignItems: 'center', marginTop: height * 0.08 }}>
          <View style={{ 
            width: Math.min(width * 0.1, 40), 
            height: Math.min(width * 0.1, 40), 
            borderWidth: 4, 
            borderColor: '#dbeafe', 
            borderTopColor: '#3b82f6', 
            borderRadius: Math.min(width * 0.05, 20),
            marginBottom: height * 0.02
          }}></View>
          <Text style={{ 
            color: '#6b7280', 
            fontSize: Math.min(width * 0.045, 18) 
          }}>로딩 중...</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
