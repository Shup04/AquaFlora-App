import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { TanksColors } from './Colors';
import Popup from './Popup';

import Modal from 'react-native-modal';
import realm from './Realm';

export const ItemComponent = ({ item, navigation }) => {

  const handlePress = () => {
    navigation.navigate('Tank')
  };

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity 
        style={styles.button}
        onPress={handlePress}
      >
        <Image 
          style={styles.image}
          source={require('./assets/TankPhotos/whole.jpg')}
        />
        <View style={styles.textContainer}>
          <Text style={styles.buttonTitle}>{item.title}</Text>
          <Text style={styles.buttonSubtitle}>{item.subtitle}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export const PlusComponent = ({ setModalVisible }) => {

  return (
  <View style={styles.buttonContainer}>
    <TouchableOpacity 
      style={styles.button}
      onPress={() => setModalVisible(true)}
    >
      <Text style={styles.plusButtonText}>+</Text>
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
  button: {
    height: 250,
    width: '100%',
    backgroundColor: TanksColors.componentDark,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
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
});