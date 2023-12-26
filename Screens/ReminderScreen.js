import React, { useEffect } from 'react';
import { ScrollView, Image, View, Text, StyleSheet } from 'react-native';
import { Colors } from '../Colors';
import { BackButton } from '../Components/BackButton';
import { ParamChart } from '../Components/ParamChart';
import { Dimensions } from 'react-native';
import { PlusComponent } from '../Components/ItemComponent';
import { RemindersContent } from '../RemindersContent';

import realm from '../database/Realm';
import { TankSchema } from '../database/schemas';

export const ReminderScreen = ({ navigation, route }) => {
  const { reminderId } = route.params;
  const [reminder, setReminder] = React.useState(null);

  useEffect(() => {
    // Query for the tank with the given id
    const reminder = realm.objectForPrimaryKey('Reminder', reminderId);
    
    if (reminder && reminder.name) {
      setReminder(reminder);
    }

  }, [reminderId]);

  return (

  <View style={styles.body}>
    <BackButton navigation={navigation}/>
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        {reminder && <Text style={styles.title}>{reminder.name}: </Text>}
        
        
      </ScrollView>
    </View>
    
  </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.backgroundDark,
    width: '100%',
    flex: 1,
    alignItems: 'flex-start',
    width: '100%',
    paddingTop: Platform.OS === 'android' ? 60 : 0,
    paddingBottom: 60
  },
  container: {
    width: '100%',
    height: '100%',
    paddingTop: 10,
    //alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 60,
  },
  title: {
    fontSize: 30,
    width: '90%',
    color: Colors.textWhite,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 'auto',
  },
});