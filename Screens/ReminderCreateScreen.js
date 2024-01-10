import React, {useRef, useState} from 'react';
import { ScrollView, View, Text, StyleSheet, Button,
  TextInput, TouchableOpacity } from 'react-native';
import { TanksColors, Colors } from '../Colors';
import { BackButton } from '../Components/BackButton';
import ImagePicker from 'react-native-image-picker';
import realm from '../database/Realm';
import DatePicker from 'react-native-date-picker';
import Checkbox from 'expo-checkbox';

import * as Notifications from 'expo-notifications';
import DropDownPicker from 'react-native-dropdown-picker';


export const ReminderCreateScreen = ({ navigation, route }) => {

  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [dateTime, setDateTime] = useState(new Date());
  const [repeating, setRepeating] = useState(false);
  const [frequency, setFrequency] = useState('daily');
  const { tankId } = route.params;

  const [openDateTimePicker, setOpenDateTimePicker] = useState(false);
  const [openRepeatingPicker, setOpenRepeatingPicker] = useState(false);

  const scheduleNotification = async (dateTime, title, desc, repeating, frequency, Id) => {
    let seconds;

    //convert repeating time to seconds
    switch (frequency) {

      case 'debug': seconds=10; break;

      case 'daily':
        seconds = 24 * 60 * 60;
        break;
      case 'weekly':
        seconds = 7 * 24 * 60 * 60;
        break;
      case 'monthly':
        seconds = 30 * 24 * 60 * 60; // Approximation
        break;
      default:
        seconds = 24 * 60 * 60; // Default to daily if no valid frequency is provided
        break;
    }

    notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: desc,
        data: { reminderId: Id, repeating: repeating, seconds: seconds, single: true } // Include repeating and seconds in the data
      },
      trigger: dateTime,
    });

    return notificationId;
  };

  const saveToRealm = () => {
    try {
      const reminderObjects = realm.objects('Reminder');
      const sortedReminderObjects = reminderObjects.sorted('id', true);
      const lastReminder = sortedReminderObjects.length > 0 ? sortedReminderObjects[0] : null;
      const nextId = lastReminder ? lastReminder.id + 1 : 1;
  
      scheduleNotification(dateTime, name, desc, repeating, frequency, nextId).then(notificationId => {

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
        setFrequency('daily');
  
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
      Notifications.cancelAllScheduledNotificationsAsync()
      console.log(`All objects in schema 'Reminder' have been cleared.`);
    } catch (error) {
      console.error(`Error clearing schema 'Reminder':`, error);
    }
  };

  return (
  <View style={styles.body}>
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

      <TouchableOpacity style={styles.box} onPress={() => setOpenDateTimePicker(true)}>
        <Text style={styles.boxText}>Reminder Date:</Text>
        <Text style={styles.input}>{dateTime.toString()}</Text>
        
        <DatePicker
          modal
          open={openDateTimePicker}
          date={dateTime}
          onConfirm={(selectedDate) => {
            setOpenDateTimePicker(false);
            setDateTime(selectedDate);
            Notifications.cancelAllScheduledNotificationsAsync("7ffc6e9b-a33f-4dd0-993f-6b39ab74f5e0");
          }}
          onCancel={() => {
            setOpenDateTimePicker(false);
          }}
        />
      </TouchableOpacity>

        <View style={styles.repeatingForm}>
          <View style={styles.checkContainer}>
            <Checkbox
              style={styles.checkbox}
              value={repeating}
              onValueChange={setRepeating}
              color={repeating ? Colors.textMarine : "#FFFFFF"}
              
            />
            <Text style={styles.checkText}>Repeating</Text>
          </View>
          
          <View style={[ styles.repeatingBox, {zIndex: 1}]}>
            <DropDownPicker
              items={[
                {label: 'Debug', value: 'debug'},
                {label: 'Daily', value: 'daily'},
                {label: 'Weekly', value: 'weekly'},
                {label: 'Monthly', value: 'monthly'},
              ]}
              open={openRepeatingPicker}
              setOpen={setOpenRepeatingPicker}

              value={frequency}
              disabled={!repeating}
              placeholder="Select Frequency"
              
              //Set value to whataver is selected
              onSelectItem={(item) => setFrequency(item.value)}

              disabledStyle={{opacity: 0.3}}
              style={{
                backgroundColor: Colors.height3,
                borderWidth: 1,
                borderBottomWidth: 0,
                borderColor: Colors.backgroundDark,
              }}
              textStyle={{
                color: Colors.textMarine,
                fontSize: 16,
                fontWeight: 'normal',
              }}
              arrowIconStyle={{
                tintColor: Colors.textMarine,
              }}
              tickIconStyle={{
                tintColor: Colors.textMarine
              }}
              dropDownContainerStyle={{
                backgroundColor: Colors.height3,
                borderWidth: 1,
                borderTopWidth: 0,
                borderColor: Colors.backgroundDark,
              }}
          />
          </View>

        </View>

        <View style={styles.createButtonHolder}>
          <TouchableOpacity style={[styles.box, styles.createBox]} title="Save" onPress={saveToRealm} >
            <Text style={styles.boxText}>Create</Text>
          </TouchableOpacity>
        </View>

{/*
        <TouchableOpacity style={[styles.box, styles.createBox]} title="Save" onPress={printRealm} >
          <Text style={styles.boxText}>Print Reminders</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.box, styles.createBox]} title="Save" onPress={clearRealm} >
          <Text style={styles.boxText}>Clear Reminders</Text>
        </TouchableOpacity>
 */}


    </View>
  </View>
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
    height: '90%',
    paddingTop: 50,
    alignItems: 'center',
    alignSelf: 'center',
  },
  box: {
    width: '90%',
    height: 75,
    backgroundColor: Colors.height3,
    borderRadius: 8,
    shadowColor: '#000000',
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
    fontWeight: 'normal',
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
  createButtonHolder: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 0,
    marginTop: 'auto',
  },
  checkbox: {
    height: 30,
    width: 30,
    //marginTop: 10,
  },
  
  repeatingBox: {
    width: '70%',
    marginLeft: 'auto',
  },
  repeatingForm: {
    flexDirection: 'row',
    width: '90%',
    marginBottom: 30,
  },
  checkContainer: {
    marginLeft: 0,
    alignItems: 'center',
    //height: 75,
    flex: 1,
    marginRight: 20,
    borderRadius: 8,
    //elevation: 3,
    //backgroundColor: Colors.height3,
    justifyContent: 'center',
  },
  checkText: {
    color: Colors.textMarine,
    fontSize: 14,
  },
});