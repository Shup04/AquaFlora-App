import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { ImageBackground, Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import ButtonComponent from './Components/ButtonComponent';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import GridList from './Components/GridList';
import { Colors, TanksColors } from './Colors';

import { FishContent } from './Homepage Content/FishContent';
import { TanksContent } from './Homepage Content/TanksContent';
import { PlantsContent } from './Homepage Content/PlantsContent';
import { RemindersContent } from './Homepage Content/RemindersContent';

import { TankScreen } from './Screens/TankScreen';
import { TankCreateScreen } from './Screens/TankCreateScreen';
import { ReminderCreateScreen } from './Screens/ReminderCreateScreen';

import { SafeAreaView } from 'react-native-safe-area-context';

import DefaultPFP from './assets/MiscImages/defaultPFP.png';
import SettingsIcon from './assets/MiscImages/settings.png';
import DashboardIcon from './assets/MiscImages/dashboard.png';
import TanksIcon from './assets/MiscImages/tanks.png';
import FishIcon from './assets/MiscImages/fish.png';
import PlantsIcon from './assets/MiscImages/plants.png';

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

//notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }), 
});

const Stack = createNativeStackNavigator();
const MyStack = ({ navigation }) => {

  //Reqest notification permissions
  useEffect(() => {
    //registerForPushNotificationAsync();

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
        return <FishContent />;
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
          color="#4287f5"
          imageLink={DefaultPFP}
          style={{
            width: 60,
            height: 60,
            marginLeft: 30,
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
          color="#4287f5"
          imageLink={SettingsIcon}
          style={{
            width: 50,
            height: 50,
            marginLeft: 30,
            marginRight: 10,
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
            width: 40,
            height: 40,
            tintColor: Colors.textMarine,
          }}
          textStyle={{
            fontSize: 13,
            fontWeight: '400',
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
            width: 40,
            height: 40,
            tintColor: Colors.textMarine,
          }}
          textStyle={{
            fontSize: 13,
            fontWeight: '400',
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
            width: 40,
            height: 40,
            tintColor: Colors.textMarine,
          }}
          textStyle={{
            fontSize: 13,
            fontWeight: '400',
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
            width: 40,
            height: 40,
            tintColor: Colors.textMarine,
          }}
          textStyle={{
            fontSize: 13,
            fontWeight: '400',
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
    flexDirection: 'row',
    padding: 10,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.height3,
  },
  flexHoz: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  header1: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textMarine,
  },
  header2: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.textMarine,
    //marginTop: 5,
    //marginLeft: 50,
  },
  HomeHeaderContainer: {
    backgroundColor: Colors.darker,
    flex: 1,
    width: '100%',
    height: 50,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,

  },
  
  tankInfo: {
    marginTop: 50,
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 2,
    borderRadius: 25,
    borderColor: Colors.dark,
    height: 100,
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.secondary,
  },
  tankImage: {
    height: 100,
    width: 100,
    borderWidth: 2,
    borderRadius: 25,
    borderColor: Colors.dark,
    position: 'absolute',
    left: -2,
  },
  tankHeader: {
    fontSize: 32,
    marginLeft: 90,
    marginRight: 10,
    fontWeight: 'bold',
    color: Colors.textWhite
  },
  tankSize: {
    fontSize: 16,
    color: Colors.dark,
    fontWeight: 'bold'
  },
  tankStatus: {
    fontSize: 16,
    color: Colors.dark,
    fontWeight: 'bold'
  },
  
  tab: {
    padding: 10
  },
  activeTab: {
    color: Colors.lightest,
    backgroundColor: Colors.darkest,
    padding: 10,
    borderRadius: 25,
  },

  
});


export default MyStack;
