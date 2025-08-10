import { useEffect } from "react";
import { View, Text } from "react-native";
import { router } from "expo-router";
import { scaleW, scaleH, font } from '../utils/scale';
import FirstScreen from "./firstscreen";

export default function App() {
  return <FirstScreen />;
}
