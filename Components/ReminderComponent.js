import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal, Button, StatusBar, Alert } from 'react-native';
import { Colors } from '../Colors';
import { BlurView } from 'expo-blur';
import realm from '../database/Realm';
import * as Notifications from 'expo-notifications';

//item is the reminder object.
export const ReminderComponent = ({ item, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [reminder, setReminder] = useState(item);

  useEffect(() => {
    // Fetch the latest reminder object here and update the state
    const updatedItem = realm.objects('Reminder').filtered(`id = ${item.id}`)[0];
    setReminder(updatedItem);
  }, [item.repeatingReminderId]); // Re-run this effect whenever `item.id` changes


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

  const deleteReminder = async () => {
    const confirmed = async () => {
      try {
  
        // Cancel single notification, then repeating.
        await Notifications.cancelScheduledNotificationAsync(reminder.notificationId).catch((error) => console.log(error));
        await Notifications.cancelScheduledNotificationAsync(reminder.repeatingReminderId).catch((error) => console.log(error));

        realm.write(() => {
          // Delete the reminder from realm
          realm.delete(realm.objectForPrimaryKey('Reminder', item.id));
        });

      } catch (error) {
        console.error("Error deleting reminder:", error);
      }
    };
    Alert.alert(
      'Are you sure you want to delete this reminder?',
      'This action is irreversible.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { text: 'Confirm', onPress: () => confirmed() },
      ],
      { cancelable: true }
    );
  };

  const convertTime = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    const remainingHours = hours % 24;
    const remainingMinutes = minutes % 60;
    const remainingSeconds = seconds % 60;

    return {
      days,
      hours: remainingHours,
      minutes: remainingMinutes,
      seconds: remainingSeconds
    };
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
              <Text style={modalStyles.modalText}>Time Left: {
                (item.dateTime.getTime() - Date.now()) > 0 ? "\n" +
                convertTime(item.dateTime.getTime() - Date.now()).days + " days\n" +
                convertTime(item.dateTime.getTime() - Date.now()).hours + " hours\n" +
                convertTime(item.dateTime.getTime() - Date.now()).minutes + " minutes": 'Overdue'
              }</Text>
              <Text style={modalStyles.modalText}>Repeats: {item.repeating ? item.frequency : 'No'}</Text>
              <View style={modalStyles.buttonContainer}>
                <TouchableOpacity onPress={handleCloseModal} style={modalStyles.button}> 
                  <Text style={modalStyles.buttonText}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={deleteReminder} style={[modalStyles.button, {width:'40%'}]}>
                  <Text style={modalStyles.buttonText}>X</Text>
                </TouchableOpacity>
              </View>
              
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
    height: 75,
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
  }
});