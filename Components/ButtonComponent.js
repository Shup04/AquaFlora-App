import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { Colors } from '../Colors';

const ButtonComponent = ({ onPress, imageLink, imageStyle, title, style, textStyle }) => {

  return (
    <TouchableOpacity 
      style={style}
      onPress={onPress}
      >
      <Image style={imageStyle} source={imageLink} />
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent;