import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { Colors } from '../Colors';

export const ReminderComponent = ({ item, navigation }) => {

  const handlePress = (reminderId) => {
    navigation.navigate('Reminder', { reminderId })
  };

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => handlePress(item.id)}
      >
        <View style={styles.textContainer}>
          <Text style={styles.buttonTitle}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export const PlusComponent = ({ navigation, destination }) => {

  const handlePress = () => {
    navigation.navigate(destination)
  };

  return (
  <View style={styles.plusButtonContainer}>
    <TouchableOpacity 
      style={styles.plusButton}
      onPress={handlePress}
    >
      <Text style={styles.plusButtonText}>Create New Reminder</Text>
    </TouchableOpacity>
  </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    //backgroundColor: 'green',
    alignItems: 'center',
    padding: 10,
  },
  plusButtonContainer: {
    width: '90%',
    height: '10%',
    alignItems: 'center',
    padding: 10,
  },
  button: {
    height: 70,
    width: '100%',
    backgroundColor: Colors.height2,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: 8,
    shadowColor: '#A4A4A4',
    elevation: 3,
  },
  plusButton: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.height2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    shadowColor: '#A4A4A4',
    elevation: 3,
  },
  image: {
    height: '70%',
    width: '100%',
    borderRadius: 8,
  },
  textContainer: {
    //height: '30%',
    justifyContent: 'center',
    marginLeft: 12,
  },
  buttonTitle: {
    color: Colors.textMarine,
    fontWeight: 'bold',
    fontSize: 24,
  },
  buttonSubtitle: {
    color: Colors.textMarine,
    fontWeight: 'bold',
    fontSize: 18,
  },
  plusButtonText: {
    color: Colors.textMarine,
    fontSize: 20,
    fontWeight: 'bold',
  },  
});