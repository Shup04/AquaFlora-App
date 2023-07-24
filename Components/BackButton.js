import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '../Colors';

export const BackButton = ({ navigation, backTo }) => {

  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.textStyle}>Back</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    height: '10%',
    width: '10%',
  },
  textStyle: {

  },
});