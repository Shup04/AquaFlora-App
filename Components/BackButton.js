import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Colors } from '../Colors';
import BackArrow from '../assets/MiscImages/backArrow.png';
import { navigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

export const BackButton = ({ navigation }) => {

  const handlePress = () => {
    navigation.goBack();
  };

  return (
      <TouchableOpacity 
        style={styles.button}
        onPress={handlePress}
      >
        <Feather name="arrow-left" size={30} color='#aaaaaa'/>
      </TouchableOpacity>
    
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: Colors.backgroundDark,
    opacity: 1,
    height: 45,
    width: 45,
  },
  icon: {
    width: 40,
    height: 40,
  },
  textStyle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.textMarine,
  },
});