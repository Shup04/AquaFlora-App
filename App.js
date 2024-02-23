import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { ImageBackground, Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import ButtonComponent from './Components/ButtonComponent';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Colors, TanksColors } from './Colors';
import { BlurView } from 'expo-blur';

import { FishContent } from './Homepage Content/FishContent';
import { TanksContent } from './Homepage Content/TanksContent';
import { PlantsContent } from './Homepage Content/PlantsContent';
import { RemindersContent } from './Homepage Content/RemindersContent';

import { TankScreen } from './Screens/TankScreen';
import { TankCreateScreen } from './Screens/TankCreateScreen';
import { ReminderCreateScreen } from './Screens/ReminderCreateScreen';
import { ParameterScreen } from './Screens/ParameterScreen';

import DefaultPFP from './assets/MiscImages/defaultPFP.png';
import SettingsIcon from './assets/MiscImages/settings.png';
import DashboardIcon from './assets/MiscImages/dashboard.png';
import TanksIcon from './assets/MiscImages/tanks.png';
import FishIcon from './assets/MiscImages/fish.png';
import PlantsIcon from './assets/MiscImages/plants.png';

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import realm from './database/Realm';
import { Provider } from 'react-redux';
import store from './store';


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
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName='Home'
          screenOptions={{
            headerShown: false // Set headerShown to false to hide the header
          }}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
            }}
          />
          <Stack.Screen 
            name="Tank" 
            component={TankScreen}
            options={{
              headerStyle: {
                backgroundColor: Colors.primary,
                headerTintColor: Colors.primary,
              }
            }} 
          />
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

const HomeScreen = ({navigation}) => {

  const [activeTab, setActiveTab] = useState('Tanks');

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const renderContent = ({navigation, item}) => {
    switch (activeTab) {
      case 'Dashboard':
        return <RemindersContent />;
      case 'Fish':
        return <FishContent navigation={navigation} />;
      case 'Tanks':        
        return <TanksContent navigation={navigation} item={item}  />;
      case 'Plants':
        return <PlantsContent />;
      
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.flexHoz}>
        <ButtonComponent
          //onPress={() => showList(1)}
          imageLink={DefaultPFP}
          style={{
            width: 50,
            height: 50,
            marginLeft: 0,
            marginRight: 10,
          }}
          imageStyle={{
            height: '90%',
            width: '90%',
          }}
          textStyle={{
            fontSize: 20,
            color: Colors.text,
          }}
        />
        <View>
          <Text style={styles.header1}>Hi Bradley!</Text>
          <Text style={styles.header2}>Your tanks are all healthy.</Text>
        </View>
        <ButtonComponent
          imageLink={SettingsIcon}
          style={{
            width: 50,
            height: 50,
            marginRight: 0,
            marginLeft: 'auto',
            
          }}
          imageStyle={{
            height: '90%',
            width: '90%',
            tintColor: Colors.textMarine,
          }}
          textStyle={{
            fontSize: 20,
            color: Colors.text,
          }}
        />
      </View>
      
  {renderContent( navigation={navigation} )}

  {/* Menu Bar On home screen */}
  <View style={styles.buttonContainer}>

        <ButtonComponent
          imageLink={DashboardIcon}
          title="Dashboard"
          onPress={() => handleTabChange('Dashboard')}
          style={{
            width: '25%',
            height: '100%',
            alignItems: 'center',
          }}
          imageStyle={{
            width: 30,
            height: 30,
            tintColor: Colors.textMarine,
          }}
          textStyle={{
            fontSize: 13,
            fontWeight: '400',
            marginTop: 5,
            color: Colors.textMarine,
          }}
        />
        <ButtonComponent
          imageLink={TanksIcon}
          title="Tanks"
          onPress={() => handleTabChange('Tanks')}
          style={{
            width: '25%',
            height: '100%',
            alignItems: 'center',
          }}
          imageStyle={{
            width: 30,
            height: 30,
            tintColor: Colors.textMarine,
          }}
          textStyle={{
            fontSize: 13,
            fontWeight: '400',
            marginTop: 5,
            color: Colors.textMarine,
          }}
        />
        <ButtonComponent
          imageLink={FishIcon}
          title="Fish"
          onPress={() => handleTabChange('Fish')}
          style={{
            width: '25%',
            height: '100%',
            alignItems: 'center',
          }}
          imageStyle={{
            width: 30,
            height: 30,
            tintColor: Colors.textMarine,
          }}
          textStyle={{
            fontSize: 13,
            fontWeight: '400',
            marginTop: 5,
            color: Colors.textMarine,
          }}
        />
        <ButtonComponent
          imageLink={PlantsIcon}
          title="Plants"
          onPress={() => handleTabChange('Plants')}
          style={{
            width: '25%',
            height: '100%',
            alignItems: 'center',
          }}
          imageStyle={{
            width: 30,
            height: 30,
            tintColor: Colors.textMarine,
          }}
          textStyle={{
            fontSize: 13,
            fontWeight: '400',
            marginTop: 5,
            color: Colors.textMarine,
          }}
        />


      </View>
    </View>
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



const styles = StyleSheet.create({
  header: {
    height: Platform.OS === 'android' ? 50 : 40,
    width: '100%',
    backgroundColor: Colors.primary,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: Colors.backgroundDark,
    alignItems: 'center',
    width: '100%',
    paddingTop: Platform.OS === 'android' ? 60 : 0,
  },
  buttonContainer: {
    display: 'flex',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    padding: 10,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.height2,
  },
  flexHoz: {
    display: 'flex',
    flexDirection: 'row',
    width: '90%',
    height: 35,
    
  },
  header1: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textMarine,
  },
  header2: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textMarine,
    //marginTop: 5,
    //marginLeft: 50,
  },

  
});


export default MyStack;
