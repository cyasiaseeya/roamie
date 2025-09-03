import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useState } from 'react';
const [content, setContent] = useState('');

const SearchBar = () => {
  	
  	<View style={[styles.view, styles.viewBg]} 
    
     <TextInput
      style={styles.input}
      value={content}
      onChangeText={setContent}
      placeholder="Search..."
    />
  	</View>
};

const styles = StyleSheet.create({
  	parent: {
    		flex: 1,
    		backgroundColor: "#d9d9d9"
  	},
  	viewBg: {
    		backgroundColor: "#d9d9d9",
    		flex: 1
};

const styles = StyleSheet.create({
  	parent: {
    		flex: 1,
    		backgroundColor: "#d9d9d9"
  	},
  	viewBg: {
    		backgroundColor: "#d9d9d9",
    		flex: 1
  	},
  	view: {
    		width: "100%",
    		height: 53
  	}
});

export default SearchBar;



