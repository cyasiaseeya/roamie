import * as React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { SurveyStyles } from "./SurveyStyles";

interface SurveyOptionProps {
  text: string;
  isSelected: boolean;
  onPress: () => void;
  style?: any;
  textStyle?: any;
}

const SurveyOption: React.FC<SurveyOptionProps> = ({ 
  text, 
  isSelected, 
  onPress, 
  style, 
  textStyle 
}) => {
  return (
    <TouchableOpacity 
      style={[
        isSelected ? SurveyStyles.optionBoxSelected : SurveyStyles.optionBox,
        style
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text 
        style={[
          isSelected ? SurveyStyles.optionTextSelected : SurveyStyles.optionText,
          textStyle
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default SurveyOption;