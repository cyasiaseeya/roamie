import { useEffect } from "react";
import { View, Text } from "react-native";
import { router } from "expo-router";
import { scaleW, scaleH, font } from '../utils/scale';
import FirstScreen from "./firstscreen";
import React from "react";
import SelectCity from "./(travel)/SelectCity";
export default function App() {
 // return <FirstSurvey />; 
  //return <FirstScreen />;
 // return <SelectMoney />;
 return <SelectCity />;

}
