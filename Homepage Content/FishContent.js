import  React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { FishComponent } from '../Components/FishItem';
import data from '../Data/fish_data.json';

export const FishContent = ({ navigation }) => {
  //const [data, setData] = useState([]);

  return (
    <View style={styles.Container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()} // Assuming 'id' is the unique identifier in your Tank schema
        renderItem={({ item }) => (
          <View>
            <FishComponent
              item = {item}
            />
          </View>
        )}
        numColumns={1}
        contentContainerStyle={styles.listContainer} // Adjust styles as needed
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    //backgroundColor: 'white',
  },
  listContainer: {
    width: '100%',
    minWidth: '100%',
  },
});