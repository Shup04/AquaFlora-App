import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { Colors } from '../Colors';

//For the case where the fish item doesnt have an image 
const DEFAULT_IMAGE_URI = 'https://engineering.fb.com/wp-content/uploads/2016/04/yearinreview.jpg';

export const FishComponent = ({ item }) => {
    const imageUri = item.image ? item.image : DEFAULT_IMAGE_URI;

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
            source={{uri:imageUri}}
            />
            <View style={styles.textContainer}>
            <Text style={styles.buttonTitle}>{item.name}</Text>
            <Text style={styles.buttonSubtitle}>{item.scientific_name}</Text>
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
    width: '100%',
    maxWidth: '100%',
    //backgroundColor: 'green',
    alignItems: 'center',
    padding: 10,
  },
  plusButtonContainer: {
    width: '100%',
    height: 75,
    alignItems: 'center',
    padding: 10,
  },
  button: {
    height: 120,
    width: '100%',
    backgroundColor: Colors.height2,
    flexDirection: 'row',
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
    height: '100%',
    width: '50%',
    borderRadius: 8,
  },
  textContainer: {
    height: '100%',
    justifyContent: 'center',
    marginLeft: 12,
    width: '45%',
    //backgroundColor:'yellow'
  },
  buttonTitle: {
    color: Colors.textMarine,
    fontWeight: 'bold',
    fontSize: 18,
    //maxWidth: '100%',
    //backgroundColor: 'red',
  },
  buttonSubtitle: {
    color: Colors.textMarine,
    fontWeight: 'bold',
    fontSize: 12,
  },
  plusButtonText: {
    color: Colors.textMarine,
    fontSize: 20,
    fontWeight: 'bold',
  },  
});