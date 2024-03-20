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
          <Text numberOfLines={2} style={ParentStyles.SubHeader}>{title}</Text>
          <Text numberOfLoines={1} style={ParentStyles.Text}>{subtitle}</Text>
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
});