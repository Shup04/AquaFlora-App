import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from './Colors';

const ButtonComponent = ({ onPress, title, style, textStyle }) => {

  const handlePress = () => {
    navigation.navigate('Tank');
  };

  return (
    <TouchableOpacity 
      style={style} 
      onPress={handlePress}
      >

      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent;