import React from 'react';
import { View, TouchableOpacity, Text, FlatList, StyleSheet } from 'react-native';
import { TanksColors } from '../Colors';
import { ItemComponent, PlusComponent } from '../Components/ItemComponent';
import realm from '../database/Realm';

export const TanksContent = ( {navigation } ) => {

  const fetchTankDataFromRealm = () => {
    try {
      const allTanks = realm.objects('Tank');
      const tankArray = Array.from(allTanks); //convert realm list to array
  
      // Convert each tank object to the format expected by the FlatList
      const dataFromRealm = tankArray.map((tank) => ({
        id: tank.id,
        title: tank.name,
        subtitle: `Size: ${tank.size}`,
        URI: tank.URI,
      }));
  
      return dataFromRealm;
    } catch (error) {
      console.error('Error fetching data from Realm database:', error);
      return [];
    }
  };
  const data = fetchTankDataFromRealm();

  const renderItem = ({ item }) => {
    return (
      <ItemComponent
        title={item.title}
        subtitle={item.subtitle}
        navigation={navigation} 
        item={item}
        URI={item.URI}
      />
    );
  };

  const keyExtractor = (item) => (item.id ? item.id.toString() : null);
  return (
    <>
    <View style={{width: '90%'}}>
      <Text style={styles.header}>My Tanks</Text>
    </View>

      <PlusComponent navigation={navigation} destination={'TankCreate'}/>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor} // Assuming 'id' is the unique identifier in your Tank schema
        numColumns={1}
        contentContainerStyle={styles.listContainer} // Adjust styles as needed
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
    minWidth: '90%',
  },
});