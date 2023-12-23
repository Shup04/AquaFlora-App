import React, {useState} from 'react';
import { ScrollView, View, Text, StyleSheet, Button,
  TextInput, TouchableOpacity } from 'react-native';
import { TanksColors } from '../Colors';
import { BackButton } from '../Components/BackButton';
import ImagePicker from 'react-native-image-picker';
import realm from '../database/Realm';
import DatePicker from 'react-native-date-picker';

import * as Notifications from 'expo-notifications';

export const ReminderCreateScreen = ({ navigation }) => {

  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [dateTime, setDateTime] = useState(new Date());
  const [repeating, setRepeating] = useState(false);
  const [frequency, setFrequency] = useState('');
  const [tankId, setTankId] = useState(0); // You'll need a way to set this, e.g., dropdown or input
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
  
      realm.write(() => {
        realm.create('Reminder', {
          id: nextId,
          name: name,
          desc: desc,
          dateTime: dateTime,
          tankId: tankId,
          notificationId: '', // This will be set when the notification is scheduled
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
      setTankId(0);

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
        <Button title="Set Reminder Date" onPress={() => setOpenDateTimePicker(true)} style={styles.Button}/>
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
    backgroundColor: TanksColors.backgroundTanks,
    height: '100%',
    width: '100%',
    flex: 1,
    //alignItems: 'flex-start',
    backgroundColor: TanksColors.backgroundTanks,
    width: '100%',
    paddingTop: Platform.OS === 'android' ? 60 : 0,
  },
  title: {
    fontSize: 30,
    width: '80%',
    color: TanksColors.text,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  subTitle: {
    fontSize: 24,
    width: '80%',
    color: TanksColors.text,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  container: {
    //backgroundColor: 'orange',
    width: '100%',
    height: '90%',
    paddingTop: 50,
    alignItems: 'center',
  },
  box: {
    width: '80%',
    backgroundColor: TanksColors.componentDark,
    borderRadius: 15,
    shadowColor: '#A4A4A4',
    elevation: 3,
    marginBottom: 30,
  },
  boxText: {
    color: TanksColors.title,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
    marginLeft: 10,
  },
  input: {
    color: TanksColors.subtitle,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    marginLeft: 10,
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