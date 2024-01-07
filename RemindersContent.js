import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, FlatList, StyleSheet } from 'react-native';
import { TanksColors } from './Colors';

import realm from './database/Realm';
import { ReminderComponent, PlusComponent } from './Components/ReminderComponent';

export const RemindersContent = ( {navigation, tankId } ) => {
  const [data, setData] = React.useState([]);

  const fetchReminderDataFromRealm = () => {
    try {
      const allReminders = realm.objects('Reminder').filtered(`tankId = ${tankId}`);
      const reminderArray = Array.from(allReminders); //convert realm list to array
  
      // Convert each reminder object to the format expected by the FlatList
      const dataFromRealm = reminderArray.map((reminder) => ({
        id: reminder.id,
        title: reminder.name,
        dateTime: reminder.dateTime,
        repeating: reminder.repeating,
        frequency: reminder.frequency,
        notificationId: reminder.notificationId,
      }));
  
      return dataFromRealm;
    } catch (error) {
      console.error('Error fetching data from Realm database:', error);
      return [];
    }
  };



  useEffect(() => {
    
    const interval = setInterval(() => {
      const newData = fetchReminderDataFromRealm();
      setData(newData);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  })

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
      <PlusComponent navigation={navigation} destination={"ReminderCreate"} tankId={tankId}></PlusComponent>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor} // Assuming 'id' is the unique identifier in your Tank schema
        numColumns={1}
        contentContainerStyle={styles.listContainer} // Adjust styles as needed
        scrollEnabled={false}
        style={styles.list}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',

  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
    marginTop: 20,
    color: TanksColors.text,
  },
  listContainer: {
    width: '100%',
    minWidth: '100%',
  },
  list: {
    paddingBottom: 60,
  },
});