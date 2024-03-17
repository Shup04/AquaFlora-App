import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
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
        <Feather name="arrow-left-circle" size={45} color='#aaaaaa' style={{backgroundColor: '#111111aa', borderRadius: 100}}/>
      </TouchableOpacity>
    
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    //marginLeft: 20,
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