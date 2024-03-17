import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { ImageBackground, Button, StyleSheet, Text, View, 
  TouchableOpacity, Animated } from 'react-native';
import ButtonComponent from './Components/ButtonComponent';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Colors, TanksColors } from './Colors';
import { BlurView } from 'expo-blur';

import { TankScreen } from './Screens/TankScreen';
import { TankCreateScreen } from './Screens/TankCreateScreen';
import { ReminderCreateScreen } from './Screens/ReminderCreateScreen';
import { ParameterScreen } from './Screens/ParameterScreen';

import * as Notifications from 'expo-notifications';
import realm from './database/Realm';
import { Provider } from 'react-redux';
import store from './store';
import { HomeTabs } from './Core/TabBar';

//notification handler
Notifications.setNotificationHandler({
  handleNotification: async (notification) => {

    if (notification.request.content.data.repeating && notification.request.content.data.single) {
      
      // Calculate the number of seconds until the next notification
      const seconds = notification.request.content.data.seconds;

      // Schedule the repeating notification
      repeatingNotificationId = await Notifications.scheduleNotificationAsync({
        content: {
          ...notification.request.content,
          data: { ...notification.request.content.data, single: false }, // Set single to false
        },
        trigger: {
          seconds: seconds,
          repeats: true,
        },
      });
      console.log("repeating Id: " + repeatingNotificationId)

      // Get the reminderId from the notification data
      const reminderId = notification.request.content.data.reminderId;
      console.log("reminder Id: " + reminderId)

      // Get the reminder from the Realm database
      try{
      const reminder = realm.objects('Reminder').filtered(`id = ${reminderId}`)[0]
      console.log("Og Reminder name: " + reminder.name)

      // Update the reminder to include the repeatingNotificationId
      realm.write(() => {
        reminder.repeatingReminderId = repeatingNotificationId;
      });
      
      console.log("idL: " + reminder.repeatingReminderId);
    } catch (error) {
      console.error('Error scheduling repeating notification:', error);
    }
      
    }

    return { shouldShowAlert: true, shouldPlaySound: false, shouldSetBadge: false };
  },
});

const Stack = createNativeStackNavigator();
const MyStack = ({ navigation }) => {

  //Reqest notification permissions
  useEffect(() => {

    // This listener is fired whenever a notification is received while the app is foregrounded
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received!', notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification
    const responseSubscription = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification response received!', response);
    });

    return () => {
      // Clean up: remove the listeners upon unmounting
      Notifications.removeNotificationSubscription(subscription);
      Notifications.removeNotificationSubscription(responseSubscription);
    };
  }, [])

  return (
    //Navigator for ALL pages
    <Provider store={store}>
      <StatusBar backgroundColor={'transparent'} />
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Home"
          screenOptions={{
            headerShown: false // Set headerShown to false to hide the header
          }}>

          {/*<Stack.Screen name="Home" component={HomeScreen}/>*/}
          <Stack.Screen name="Home" component={HomeTabs} />

          {/*Screens for the home page
          <Stack.Screen name="H_Dashboard" component={DashboardScreen}/>
          <Stack.Screen name="H_Tanks" component={TanksScreen}/>
          <Stack.Screen name="H_Fish" component={FishScreen}/>
          <Stack.Screen name="H_Plants" component={PlantsScreen}/>
          */}
          
          <Stack.Screen name="Tank" component={TankScreen}/>
          <Stack.Screen
            name="Parameters"
            backTo="TankScreen"
            component={ParameterScreen}
          />

          <Stack.Screen
            name="TankCreate"
            backTo="HomeScreen"
            component={TankCreateScreen}
          />
          <Stack.Screen
            name="ReminderCreate"
            backTo="TankScreen"
            component={ReminderCreateScreen}
            
          />

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};


//push notif token
{/*
async function registerForPushNotificationAsync() {
  let token;
  try {
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  } catch (error) {
    console.error('Error getting push token:', error);
  }
}
*/}

export default MyStack;
