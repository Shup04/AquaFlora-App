import  React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, ScrollView, Image, TextInput } from 'react-native';
import { FishComponent } from '../../Components/FishItem';
import data from '../../Data/fish_data.json';
import { Colors } from '../../Colors';
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
    <View style={ParentStyles.Background}>
      <View style={ParentStyles.Container}>
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
  plusButtonContainer: {
    width: '100%',
    height: 75,
    alignItems: 'center',
    padding: 10,
  },
  plusButton: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.height2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    shadowColor: '#000000',
    elevation: 3,
  },
  plusButtonText: {
    color: Colors.textMarine,
    fontSize: 20,
    fontWeight: 'bold',
  },  
  searchBar: {
    height: 40,
    width: '95%',
    margin: 10,
    borderWidth: 0,
    padding: 10,
    borderRadius: 5,
    borderColor: Colors.textMarine,
    color: Colors.textMarine,
    backgroundColor: Colors.height3
  },
});

const modalStyles = StyleSheet.create({
  centeredView: {
    height: '100%',
    marginTop: -32,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#FFFFFF',
  },
  modalView: {
    height: '50%',
    width: '80%',
    margin: 20,
    backgroundColor: Colors.height3,
    //backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 35,
    //alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textMarine,
    marginBottom: 15,
    textAlign: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 15,
    //textAlign: "center",
    color: Colors.textMarine,
  },
  button: {
    borderRadius: 20,
    elevation: 2,
    backgroundColor: Colors.height4,
    width: '50%',
    height: '70%',
    justifyContent: 'center',
    alignSelf: 'center',
    //marginBottom: 5,
    //marginTop: 'auto',
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 16,
    color: Colors.textMarine,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: '20%',
    //justifyContent: 'flex-end',
    alignItems: 'center',
    //backgroundColor: 'green',
    marginBottom: 0,
    marginTop: 'auto',
  },
});