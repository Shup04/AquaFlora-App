import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from './Colors';


const ButtonComponent = ({ onPress, title, style, textStyle }) => {

  return (
    <TouchableOpacity 
      style={style} 
      onPress={onPress}
      >

      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent;