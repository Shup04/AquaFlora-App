import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TankColors } from '../Colors';

export const TankScreen = ({navigation}) => {
  return (
  <View style={styles.body}>
    <Text> 
      Tank Screen
    </Text>
  </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: TankColors.backgroundColor,
    height: '100%',
    width: '100%',
  },
});