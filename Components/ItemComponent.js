import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { TanksColors } from '../Colors';

export const ItemComponent = ({ item, title, subtitle, navigation }) => {

  const handlePress = (tankId) => {
    navigation.navigate('Tank', { tankId })
  };

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => handlePress(item.id)}
      >
        <Image 
          style={styles.image}
          source={require('../assets/TankPhotos/whole.jpg')}
        />
        <View style={styles.textContainer}>
          <Text style={styles.buttonTitle}>{title}</Text>
          <Text style={styles.buttonSubtitle}>{subtitle}</Text>
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
      <Text style={styles.plusButtonText}>Create New Tank</Text>
    </TouchableOpacity>
  </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: '50%',
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
    height: 220,
    width: '100%',
    backgroundColor: TanksColors.componentDark,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: 15,
    shadowColor: '#A4A4A4',
    elevation: 3,
  },
  plusButton: {
    height: '100%',
    width: '100%',
    backgroundColor: TanksColors.componentDark,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    shadowColor: '#A4A4A4',
    elevation: 3,
  },
  image: {
    height: '70%',
    width: '100%',
    borderRadius: 15,
  },
  textContainer: {
    height: '30%',
    justifyContent: 'center',
    marginLeft: 12,
  },
  buttonTitle: {
    color: TanksColors.title,
    fontWeight: 'bold',
    fontSize: 24,
  },
  buttonSubtitle: {
    color: TanksColors.subtitle,
    fontWeight: 'bold',
    fontSize: 18,
  },
  plusButtonText: {
    color: TanksColors.title,
    fontSize: 20,
    fontWeight: 'bold',
  },  
});