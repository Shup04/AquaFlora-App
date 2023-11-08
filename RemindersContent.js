import React from 'react';
import { View, TouchableOpacity, Text, FlatList, StyleSheet } from 'react-native';
import { TanksColors } from './Colors';
import { ItemComponent, PlusComponent } from './Components/ItemComponent';
import realm from './database/Realm';
import { ReminderComponent } from './Components/ReminderComponent';

export const RemindersContent = ( {navigation } ) => {

  const fetchReminderDataFromRealm = () => {
    try {
      const allReminders = realm.objects('Reminder');
      const reminderArray = Array.from(allReminders); //convert realm list to array
  
      // Convert each tank object to the format expected by the FlatList
      const dataFromRealm = reminderArray.map((reminder) => ({
        id: reminder.id,
        title: reminder.name,
      }));
  
      return dataFromRealm;
    } catch (error) {
      console.error('Error fetching data from Realm database:', error);
      return [];
    }
  };
  const data = fetchReminderDataFromRealm();

  const renderItem = ({ item }) => {
    return (
      <ReminderComponent
        navigation={navigation} 
        item={item}/>
    );
  };

  const keyExtractor = (item) => (item.id ? item.id.toString() : null);

  return (
    <>
      <PlusComponent navigation={navigation} destination={"ReminderCreate"}></PlusComponent>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor} // Assuming 'id' is the unique identifier in your Tank schema
        numColumns={2}
        contentContainerStyle={styles.listContainer} // Adjust styles as needed
      />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
    marginTop: 20,
    color: TanksColors.text,
  },
  listContainer: {
    width: '90%',
    minWidth: '90%',
  },
});