import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import {scaleH,scaleW} from '@/utils/scale'
const SearchBar = () => {

  const [content, setContent] = useState('');
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={setContent}
        placeholder="도시 이름을 검색해주세요"
        placeholderTextColor="#888" 
      />
    </View>
  );
};

// 3. StyleSheet를 하나로 합치고 스타일을 정리
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF", // 배경색을 흰색으로 변경하여 구분
    borderRadius: 10, // 모서리를 둥글게
    width: '100%', // 부모 컨테이너의 전체 너비 사용   
    height: scaleH(50),  
    justifyContent: 'center',
    paddingHorizontal: 15,
    // alignSelf: 'center' 제거 - 왼쪽 정렬
    marginTop: 10,
    // 그림자 효과 (선택 사항)
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    fontSize: 16,
    height: '100%',
  }
});

export default SearchBar;



