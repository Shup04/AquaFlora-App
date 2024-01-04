import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal, Button, StatusBar } from 'react-native';
import { Colors } from '../Colors';
import { BlurView } from 'expo-blur';

//item is the reminder object.
export const ReminderComponent = ({ item, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = (reminderId) => {
    //navigation.navigate('Reminder', { reminderId })
    setModalVisible(true);
  };

  //open edit menu popup modal
  const handleLongPress = () => {
    setModalVisible(true);
  };
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => handlePress(item.id)}
        onLongPress={() => handleLongPress()}
        delayLongPress={500}
      >
        <View style={styles.textContainer}>
          <Text style={styles.buttonTitle}>{item.title}</Text>
        </View>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View>
          <BlurView style={modalStyles.centeredView} tint={'dark'}>
            <View style={modalStyles.modalView}>
              <Text style={modalStyles.modalTitle}>{item.title}</Text>
              <Text style={modalStyles.modalText}>Due Date: {item.dateTime.toLocaleString('en-US', {day: 'numeric', month: 'long', year: 'numeric'})}</Text>
              <Text style={modalStyles.modalText}>Due Time: {item.dateTime.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true})}</Text>
              <Text style={modalStyles.modalText}>Repeats: {item.repeating ? item.frequency : 'No'}</Text>
              <TouchableOpacity onPress={handleCloseModal} style={modalStyles.button}> 
                <Text style={modalStyles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </View>
        
      </Modal>
      
    </View>
  );
};

export const PlusComponent = ({ navigation, destination, tankId }) => {

  const handlePress = (tankId) => {
    navigation.navigate(destination, {tankId: tankId});
  }; 

  return (
  <View style={styles.plusButtonContainer}>
    <TouchableOpacity 
      style={styles.plusButton}
      onPress={() => handlePress(tankId)}
    >
      <Text style={styles.plusButtonText}>Create New Reminder</Text>
    </TouchableOpacity>
  </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    //backgroundColor: 'green',
    alignItems: 'center',
    padding: 10,
  },
  plusButtonContainer: {
    width: '100%',
    height: '10%',
    alignItems: 'center',
    padding: 10,
  },
  button: {
    height: 70,
    width: '100%',
    backgroundColor: Colors.height2,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: 8,
    shadowColor: '#000000',
    elevation: 3,
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
  image: {
    height: '70%',
    width: '100%',
    borderRadius: 8,
  },
  textContainer: {
    //height: '30%',
    justifyContent: 'center',
    marginLeft: 12,
  },
  buttonTitle: {
    color: Colors.textMarine,
    fontWeight: 'bold',
    fontSize: 24,
  },
  buttonSubtitle: {
    color: Colors.textMarine,
    fontWeight: 'bold',
    fontSize: 18,
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
    alignItems: "center",
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
    textAlign: "center",
    color: Colors.textMarine,
  },
  button: {
    borderRadius: 20,
    elevation: 2,
    backgroundColor: Colors.height4,
    width: '50%',
    height: '15%',
    justifyContent: 'center',
    marginBottom: 5,
    marginTop: 'auto',
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 16,
    color: Colors.textMarine,

  },
});