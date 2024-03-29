import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, FlatList, StyleSheet } from 'react-native';
import { Colors } from '../Colors';
import { ItemComponent, PlusComponent } from '../Components/ItemComponent';
import realm from '../database/Realm';

import { ParentStyles } from '../Styles/ParentStyles';

export const TanksContent = ( {navigation } ) => {
  const [data, setData] = React.useState([]);
  //fetch entire tank list from realm
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
  
  useEffect(() => {
    const interval = setInterval(() => {
      const newData = fetchTankDataFromRealm();
      setData(newData);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  
  })

  //Render one tank
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

  //Key extractor for flatlist
  const keyExtractor = (item) => (item.id ? item.id.toString() : null);

  return (
    <View style={{backgroundColor: 'green'}}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
    marginTop: 20,
    color: Colors.textMarine,
  },
  listContainer: {
    width: '100%',
    minWidth: '100%',
  },
  Background: {
    width: '100%',
    height: '100%',
    backgroundColor: 'green'
},
});