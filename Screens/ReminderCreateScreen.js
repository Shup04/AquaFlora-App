import React, {useState} from 'react';
import { ScrollView, View, Text, StyleSheet, Button,
  TextInput, TouchableOpacity } from 'react-native';
import { TanksColors } from '../Colors';
import { BackButton } from '../Components/BackButton';
import ImagePicker from 'react-native-image-picker';
import realm from '../database/Realm';
import DatePicker from 'react-native-date-picker';

export const ReminderCreateScreen = ({ navigation }) => {

  const [reminderName, setReminderName] = React.useState('');
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());

  const saveToRealm = () => {
    try {
      const reminderObjects = realm.objects('Reminder');
      const sortedReminderObjects = reminderObjects.sorted('id', true);
      const lastReminder = sortedReminderObjects.length > 0 ? sortedReminderObjects[0] : null;
      const nextId = lastReminder ? lastReminder.id + 1 : 1;
  
      realm.write(() => {
        realm.create('Reminder', { id: nextId, name: reminderName, startDate: startDate, endDate: endDate });
      });
  
      setReminderName('');
      setStartDate(new Date());
      setEndDate(new Date());
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
        console.log(`ID: ${reminder.id}, Name: ${reminder.name}, Start Date: ${reminder.startDate}, End Date: ${reminder.endDate}`);
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
  
  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)

  return (
  <ScrollView style={styles.body}>
    <BackButton navigation={navigation} />
    <View style={styles.container}>
      <Text style={styles.title}>Create New Reminder:</Text>
      <View style={styles.box}>
        <Text style={styles.boxText}>Name:</Text>
        <TextInput
          value={reminderName}
          onChangeText={(reminderName) => setReminderName(reminderName)}
          style={styles.input}
        />
      </View>
      <View style={styles.box}>
        <Text style={styles.boxText}>Start Date:</Text>
        <Button title="Set Start Date" onPress={() => setOpen1(true)} />
        <DatePicker
          modal
          open={open1}
          date={date1}
          onConfirm={(date1) => {
            setOpen1(false)
            setStartDate(date1)
          }}
          onCancel={() => {
            setOpen1(false1)
          }}
        />
      </View>
      <View style={styles.box}>
        <Text style={styles.boxText}>End Date:</Text>
        <Button title="Set End Date" onPress={() => setOpen2(true)} />
        <DatePicker
          modal
          open={open2}
          date={date2}
          onConfirm={(date2) => {
            setOpen2(false)
            setEndDate(date2)
          }}
          onCancel={() => {
            setOpen2(false1)
          }}
        />
      </View>
      
      <TouchableOpacity style={[styles.box, styles.createBox]} title="Save" onPress={saveToRealm} >
        <Text style={styles.boxText}>Create</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.box, styles.createBox]} title="Save" onPress={printRealm} >
        <Text style={styles.boxText}>Print Tanks</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.box, styles.createBox]} title="Save" onPress={clearRealm} >
        <Text style={styles.boxText}>Clear Tanks</Text>
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
  uploadButton: {
    width: 100,
  },
  createBox: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});