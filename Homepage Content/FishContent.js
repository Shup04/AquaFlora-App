import  React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, ScrollView, Image } from 'react-native';
import { FishComponent } from '../Components/FishItem';
import data from '../Data/fish_data.json';
import { Colors } from '../Colors';
import { BlurView } from 'expo-blur';

export const FishContent = ({ navigation }) => {


  const sortedData = data.sort((a, b) => {
    // Items with images should come first
    if (a.image && b.image) return 0; // Both have images, keep original order
    if (a.image) return -1; // Only 'a' has an image, it comes first
    return 1; // Only 'b' has an image or neither have, 'b' comes first or equal
  });
  
  return (
    <View style={styles.Container}>
      <FlatList
        data={sortedData}
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

export const PersonalFishContent = ({ navigation }) => {


  
  return (
    <View style={styles.Container}>
      <PlusComponent navigation={navigation} destination={"ReminderCreate"} tankId={0}></PlusComponent>
      <FlatList
        data={0}
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
}

export const PlusComponent = ({ navigation, destination, tankId }) => {

  const [fishPick, setFishPick] = useState(false);

  const handlePress = () => {
    setFishPick(true);
  }; 
  const handleCloseModal = () => {
    setFishPick(false);
  }; 

  return (
    <>
      <View style={styles.plusButtonContainer}>
        <TouchableOpacity 
          style={styles.plusButton}
          onPress={() => handlePress()}
        >
          <Text style={styles.plusButtonText}>Add New Fish</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={fishPick}
        onRequestClose={handleCloseModal}
      >
        <View style={modalStyles.KeyboardAvoidingView}>
        <BlurView style={modalStyles.centeredView} tint={'dark'}>
          <View style={modalStyles.modalView}>
            <View style={{ borderRadius: 8, overflow: 'hidden' }}>
              <ScrollView>
                
                <Text style={modalStyles.modalTitle}>"hi"</Text>
                <Text style={modalStyles.modalSubtitle}>"Hi"</Text>
                <Text style={modalStyles.modalText}>"hi"</Text>
              </ScrollView>
            </View>
          </View>
        </BlurView>
        </View>
      </Modal>
    </>
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