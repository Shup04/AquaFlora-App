import React from 'react';
import { View, TouchableOpacity, Text, FlatList, StyleSheet } from 'react-native';
import { TanksColors } from '../Colors';
import { ItemComponent, PlusComponent } from '../Components/ItemComponent';

export const TanksContent = ( {navigation } ) => {
  const data = [
    { id: 1, isLast: false, title: 'NanoCube', subtitle: 'Size: 5G' },
    { id: 2, title: 'NanoBowl', subtitle: 'Size: 1G' },
    { id: 3, title: 'High Planted', subtitle: 'Size: 10G' },
    { id: 4, title: 'High Tech', subtitle: 'Size: 26G' },
    { id: 5, title: 'Reef Tank', subtitle: 'Size: 75G' },
  ];

  const renderItem = ({ item }) => {
    if (item.isLast) {
      return (
        <PlusComponent navigation={navigation}/>
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

      <PlusComponent navigation={navigation}/>

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