import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, Modal } from 'react-native';
import { Colors } from '../Colors';
import { BlurView } from 'expo-blur';

//For the case where the fish item doesnt have an image 
const DEFAULT_IMAGE_URI = 'https://engineering.fb.com/wp-content/uploads/2016/04/yearinreview.jpg';

export const FishComponent = ({ item, navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const imageUri = item.image ? item.image : DEFAULT_IMAGE_URI;

    const handlePress = (tankId) => {
      setModalVisible(true);
    };

    handleCloseModal = () => {
      setModalVisible(false);
    }
  

    return (
        <View style={styles.buttonContainer}>
        <TouchableOpacity 
            style={styles.button}
            onPress={() => handlePress(item.id)}
        >
            <Image
            style={styles.image}
            source={{uri:imageUri}}
            />
            <View style={styles.textContainer}>
            <Text style={styles.buttonTitle}>{item.name}</Text>
            <Text style={styles.buttonSubtitle}>{item.scientific_name}</Text>
            </View>
        </TouchableOpacity>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCloseModal}
        >
          <View style={modalStyles.KeyboardAvoidingView}>
          <BlurView style={modalStyles.centeredView} tint={'dark'}>
            <View style={modalStyles.modalView}>
              <Image
              style={modalStyles.image}
              source={{uri:imageUri}}
              />
              <Text style={modalStyles.modalTitle}>{item.name}</Text>
              <Text style={modalStyles.modalText}>{item.scientific_name}</Text>
            </View>
          </BlurView>
          </View>
        </Modal>
        </View>
    );
};

export const PlusComponent = ({ navigation, destination }) => {

  const handlePress = () => {
    navigation.navigate(destination)
  };

  return (
  <View style={styles.plusButtonContainer}>
    <TouchableOpacity 
      style={styles.plusButton}
      onPress={handlePress}
    >
      <Text style={styles.plusButtonText}>Create New Tank</Text>
    </TouchableOpacity>
  </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    maxWidth: '100%',
    //backgroundColor: 'green',
    alignItems: 'center',
    padding: 10,
  },
  plusButtonContainer: {
    width: '100%',
    height: 75,
    alignItems: 'center',
    padding: 10,
  },
  button: {
    height: 120,
    width: '100%',
    backgroundColor: Colors.height2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: 8,
    shadowColor: '#000000',
    elevation: 5,
  },
  plusButton: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.height2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    shadowColor: '#000000',
    elevation: 5,
  },
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
    //backgroundColor:'yellow'
  },
  buttonTitle: {
    color: Colors.textMarine,
    fontWeight: 'bold',
    fontSize: 18,
    //maxWidth: '100%',
    //backgroundColor: 'red',
  },
  buttonSubtitle: {
    color: Colors.textMarine,
    fontWeight: 'bold',
    fontSize: 12,
  },
  plusButtonText: {
    color: Colors.textMarine,
    fontSize: 20,
    fontWeight: 'bold',
  },  
});

const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#FFFFFF',
  },
  modalView: {
    height: '75%',
    width: '90%',
    margin: 20,
    backgroundColor: Colors.height3,
    //backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    //alignItems: "center",
    justifyContent: "flex-start",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  KeyboardAvoidingView: {
    width: '100%',
    height: '100%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textMarine,
    marginBottom: 15,
    //textAlign: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
    //textAlign: "center",
    color: Colors.textMarine,
  },
  button: {
    borderRadius: 5,
    elevation: 2,
    backgroundColor: Colors.height4,
    width: '50%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 10,
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
  textInput: {
    borderRadius: 5,
    elevation: 2,
    backgroundColor: Colors.height4,
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignSelf: 'center',
    paddingLeft: 10,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,

  }
});