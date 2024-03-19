import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { Colors } from '../Colors';
import { ParentStyles, ButtonStyles } from '../Styles/ParentStyles';

export const ItemComponent = ({ item, title, subtitle, URI, navigation }) => {

  const handlePress = (tankId) => {
    navigation.navigate('Tank', { tankId })
  };

  return (
    <>
      <TouchableOpacity 
        style={ButtonStyles.Button}
        onPress={() => handlePress(item.id)}
      >
        <Image
          style={styles.image}
          source={{
            uri: item.URI,
          }}
        />
        <View style={styles.textContainer}>
          <Text numberOfLines={1} style={[ParentStyles.Header, styles.title]}>{title}</Text>
          <Text style={ParentStyles.SubHeader}>{subtitle}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

export const PlusComponent = ({ navigation, destination }) => {

  const handlePress = () => {
    navigation.navigate(destination)
  };

  return (
  <>
    <TouchableOpacity 
      style={ButtonStyles.PlusButton}
      onPress={handlePress}
    >
      <Text style={ParentStyles.SubHeader}>Create New Tank</Text>
    </TouchableOpacity>
  </>
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

  button: {
    height: 100,
    width: '100%',
    backgroundColor: Colors.height2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
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