import  React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, ScrollView, Image, TextInput } from 'react-native';
import { FishComponent } from '../../Components/FishItem';
import data from '../Data/fish_data.json';
import { Colors } from '../Colors';
import { BlurView } from 'expo-blur';
import { ParentStyles } from '../../Styles/ParentStyles';

export const FishScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  //Moves fish without image to bottom
  //Also filters by search query
  const getFilteredAndSortedData = () => {
    return data.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) // filter by search query
    ).sort((a, b) => {
      // sort logic (keeping your original sorting logic)
      if (a.image && b.image) return 0;
      if (a.image) return -1;
      return 1;
    });
  };

  const [displayData, setDisplayData] = useState(getFilteredAndSortedData());


  // Update displayData whenever the searchQuery changes
  useEffect(() => {
    setDisplayData(getFilteredAndSortedData());
  }, [searchQuery]);
  
  return (
    <View style={styles.Container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholderTextColor={Colors.textMarine}

      />
      <FlatList
        data={displayData}
        keyExtractor={(item, index) => index.toString()} // Assuming 'id' is the unique identifier in your Tank schema
        renderItem={({ item }) => (
          <View>
            <FishComponent
              item = {item}
              navigation = {navigation}
            />
          </View>
        )}
        numColumns={1}
        contentContainerStyle={styles.listContainer} // Adjust styles as needed
      />
    </View>
  );
};