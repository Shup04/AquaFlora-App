import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '../Colors';

const HeaderButton = ({ onPress, title, style, textStyle }) => {

  return (
    <TouchableOpacity 
      style={style} 
      >

      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default HeaderButton;