import React, {useState} from 'react';
import { ScrollView, View, Text, StyleSheet, Button,
  TextInput, TouchableOpacity } from 'react-native';
import { TanksColors, Colors } from '../Colors';
import { BackButton } from '../Components/BackButton';
import ImagePicker from 'react-native-image-picker';
import realm from '../database/Realm';
import DatePicker from 'react-native-date-picker';
import Checkbox from 'expo-checkbox';

import * as Notifications from 'expo-notifications';

export const ReminderCreateScreen = ({ navigation, route }) => {

  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [dateTime, setDateTime] = useState(new Date());
  const [repeating, setRepeating] = useState(false);
  const [frequency, setFrequency] = useState('');
  const { tankId } = route.params;
  const [openDateTimePicker, setOpenDateTimePicker] = useState(false);

  const scheduleNotification = async (dateTime, title, desc) => {
    return await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: desc,

      },
      trigger: dateTime,
    });
  };

  const saveToRealm = () => {
    try {
      const reminderObjects = realm.objects('Reminder');
      const sortedReminderObjects = reminderObjects.sorted('id', true);
      const lastReminder = sortedReminderObjects.length > 0 ? sortedReminderObjects[0] : null;
      const nextId = lastReminder ? lastReminder.id + 1 : 1;
  
      scheduleNotification(dateTime, name, desc).then(notificationId => {

        realm.write(() => {
          realm.create('Reminder', {
            id: nextId,
            name: name,
            desc: desc,
            dateTime: dateTime,
            tankId: tankId, // set tankId to whatever is passed from the tank screen, works for now.
            notificationId: notificationId, // This will be set when the notification is scheduled
            repeating: repeating,
            frequency: repeating ? frequency : null, // Set frequency only if repeating
            nextTrigger: dateTime, // Initially, nextTrigger will be the same as dateTime
            missed: false,
            acknowledged: false
          });
        });
 
        setName('');
        setDesc('');
        setDateTime(new Date());
        setRepeating(false);
        setFrequency('');
  
      }).catch(error => {
        console.error('Error scheduling Notification:', error)
      });
 
    } catch (error) {
      console.error('Error saving to Realm database:', error);
    }
  };

  const printRealm = () => {
    try {
      // Get all data from the 'Reminder' schema
      const allReminders = realm.objects('Reminder');
  
      // Print the data
      console.log('Database content for Reminders:');
      allReminders.forEach((reminder) => {
        console.log(`ID: ${reminder.id}, Name: ${reminder.name}, dateTime: ${reminder.dateTime}`);
      });
    } catch (error) {
      console.error('Error reading from Realm database:', error);
    }
  };

  const clearRealm = () => {
    try {
      realm.write(() => {
        const objectsToDelete = realm.objects('Reminder');
        realm.delete(objectsToDelete);
      });
      console.log(`All objects in schema 'Reminder' have been cleared.`);
    } catch (error) {
      console.error(`Error clearing schema 'Reminder':`, error);
    }
  };

  return (
  <ScrollView style={styles.body}>
    <BackButton navigation={navigation} />
    <View style={styles.container}>
      <Text style={styles.title}>Create New Reminder:</Text>
      <View style={styles.box}>
        <Text style={styles.boxText}>Name:</Text>
        <TextInput
          value={name}
          onChangeText={(name) => setName(name)}
          style={styles.input}
        />
      </View>

      <View style={styles.box}>
        <Text style={styles.boxText}>Reminder Date:</Text>
        <Text style={styles.input}>{dateTime.toString()}</Text>
        
        <DatePicker
          modal
          open={openDateTimePicker}
          date={dateTime}
          onConfirm={(selectedDate) => {
            setOpenDateTimePicker(false);
            setDateTime(selectedDate);
          }}
          onCancel={() => {
            setOpenDateTimePicker(false);
          }}
        />
      </View>


        <TouchableOpacity style={[styles.box, styles.createBox]} title="Save" onPress={() => setOpenDateTimePicker(true)} >
          <Text style={styles.boxText}>Set Reminder Date</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.box, styles.createBox]} title="Save" onPress={saveToRealm} >
          <Text style={styles.boxText}>Create</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.box, styles.createBox]} title="Save" onPress={printRealm} >
          <Text style={styles.boxText}>Print Reminders</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.box, styles.createBox]} title="Save" onPress={clearRealm} >
          <Text style={styles.boxText}>Clear Reminders</Text>
        </TouchableOpacity>


    </View>
  </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.backgroundDark,
    height: '100%',
    width: '100%',
    paddingTop: Platform.OS === 'android' ? 60 : 0,
  },
  title: {
    fontSize: 30,
    width: '80%',
    color: Colors.textMarine,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  subTitle: {
    fontSize: 24,
    width: '80%',
    color: Colors.textMarine,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  container: {
    //backgroundColor: 'orange',
    width: '100%',
    //height: '100%',
    paddingTop: 50,
    alignItems: 'center',
  },
  box: {
    width: '90%',
    height: 75,
    backgroundColor: Colors.height3,
    borderRadius: 8,
    shadowColor: '#A4A4A4',
    elevation: 3,
    marginBottom: 30,
  },
  boxText: {
    color: Colors.textMarine,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
    marginLeft: 10,
  },
  input: {
    color: Colors.textMarine,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 'auto',
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: Colors.textWhite,

  },
  Button: {
    width: '80%',
    height: '100%',
  },
  uploadButton: {
    width: 100,
  },
  createBox: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    
  },

});