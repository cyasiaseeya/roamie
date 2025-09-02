import { StyleSheet, Text, View ,Image, TouchableOpacity} from 'react-native'
import React from 'react'
import { DrawerContentComponentProps } from '@react-navigation/drawer';

const CustomDrawer = (props: DrawerContentComponentProps) => {
  return (
    <View>
      <Text>내 여행</Text>
    </View>
  )
}

export default CustomDrawer

const styles = StyleSheet.create({})