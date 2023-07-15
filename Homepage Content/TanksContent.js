import React from 'react';
import { View, TouchableOpacity, Text, FlatList, StyleSheet } from 'react-native';
import { TanksColors } from '../Colors';
import { ItemComponent, PlusComponent } from '../ItemComponent';

export const TanksContent = ( {navigation} ) => {
  const data = [
    { id: 1, isLast: false, title: 'NanoCube', subtitle: 'Size: 5G' },
    { id: 2, isLast: false, title: 'NanoBowl', subtitle: 'Size: 1G' },
    { id: 3, isLast: false, title: 'High Planted', subtitle: 'Size: 10G' },
    { id: 4, isLast: false, title: 'High Tech', subtitle: 'Size: 26G' },
    { id: 5, isLast: false, title: 'Reef Tank', subtitle: 'Size: 75G' },
    { id: 6, isLast: true },
  ];

  const renderItem = ({ item }) => {
    if (item.isLast) {
      return (
        <PlusComponent/>
      );
    }
    return (
      <ItemComponent item ={item} navigation={navigation} />
    );
  };

  return (
    <>
    <View style={{width: '90%'}}>
      <Text style={styles.header}>My Tanks</Text>
    </View>
      
      <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      contentContainerStyle={styles.listContainer}
      />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
    marginTop: 20,
    color: TanksColors.text,
  },
  listContainer: {
    width: '90%',
  },
});