import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { Colors } from '../Colors';


export const ItemComponent = ({ item, title, subtitle, URI, navigation }) => {

  const handlePress = (tankId) => {
    navigation.navigate('Tank', { tankId })
  };

  return (
    <View style={styles.buttonContainer}>
      {console.log(URI)}
      <TouchableOpacity 
        style={styles.button}
        onPress={() => handlePress(item.id)}
      >
        <Image
          style={styles.image}
          source={{
            uri: item.URI,
          }}
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
    backgroundColor: Colors.height2,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: 8,
    shadowColor: '#000000',
    elevation: 5,
  },
  plusButton: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.height2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    shadowColor: '#000000',
    elevation: 5,
  },
  image: {
    height: '70%',
    width: '100%',
    borderRadius: 8,
  },
  textContainer: {
    height: '30%',
    justifyContent: 'center',
    marginLeft: 12,
  },
  buttonTitle: {
    color: Colors.textWhite,
    fontWeight: 'bold',
    fontSize: 24,
  },
  buttonSubtitle: {
    color: Colors.textWhite,
    fontWeight: 'bold',
    fontSize: 18,
  },
  plusButtonText: {
    color: Colors.textWhite,
    fontSize: 20,
    fontWeight: 'bold',
  },  
});