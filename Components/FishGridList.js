import React, { useState } from 'react';
import { View, Button, FlatList, StyleSheet } from 'react-native';
import ButtonComponent from './ButtonComponent';
import { useNavigation } from '@react-navigation/native';

const GridList = () => {
  const [items, setItems] = useState([]);
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <View style={styles.item}>
        <ButtonComponent 
            onPress={() => handleRemoveItem(item)}
            //onPress={() => navigation.navigate('Tank')}
            title={item.name}
        />
    </View>
    
    
  );

  const handleAddItem = () => {
    const newItem = {
      id: items.length + 1,
      name: `Tank ${items.length + 1}`
    };
    setItems([...items, newItem]);
  };

  const handleRemoveItem = (item) => {
    const updatedItems = items.filter((i) => i !== item);
    setItems(updatedItems);
  };

  return (
    <View style={styles.container}>
      <ButtonComponent 
      onPress={handleAddItem}
      title="Add New Tank"
      />
      <FlatList
        style={styles.list}
        data={items}
        numColumns={3}
        keyExtractor={(item) => item}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    width: '100%',
    //backgroundColor: 'green'
  },
  item: {
    margin: '1%',
    width: '31.667%',
    //backgroundColor: 'red',
  },

});

export default GridList;
