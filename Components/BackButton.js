import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { Colors } from '../Colors';
import BackArrow from '../assets/MiscImages/backArrow.png';
import { navigation } from '@react-navigation/native';

export const BackButton = ({ navigation }) => {

  const handlePress = () => {
    navigation.navigate("Home");
  };

  return (
    <TouchableOpacity 
      style={styles.button}
      onPress={handlePress}
    >
      <Text style={styles.textStyle}>&lt; Back</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    marginLeft: 20,
  },
  icon: {
    width: 40,
    height: 40,
  },
  textStyle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
  },
});