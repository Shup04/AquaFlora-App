import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ImageBackground, Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import ButtonComponent from './ButtonComponent';
import BezierChart from './BezierChart';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import GridList from './GridList';
import { Colors, TanksColors } from './Colors';

import { FishContent } from './FishContent';
import { TanksContent } from './TanksContent';
import { PlantsContent } from './PlantsContent';
import { RemindersContent } from './RemindersContent';

import { SafeAreaView } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();
const image = {uri: 'https://reactjs.org/logo-og.png'};

const MyStack = () => {
  return (
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeScreen = ({navigation}) => {

  const [activeTab, setActiveTab] = useState('Fish');

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Fish':
        return <FishContent />;
      case 'Tanks':
        return <TanksContent />;
      case 'Plants':
        return <PlantsContent />;
      case 'Reminders':
        return <RemindersContent />;
      default:
        return null;
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.flexHoz}>
        <ButtonComponent
          //onPress={() => showList(1)}
          title="pfp"
          color="#4287f5"
          style={{
            width: 60,
            height: 60,
            marginLeft: 20,
            backgroundColor: 'blue',
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
          //onPress={() => showList(1)}
          title="settings"
          color="#4287f5"
          style={{
            marginLeft: 'auto',
            marginRight: 20,
            backgroundColor: 'blue',
          }}
          textStyle={{
            fontSize: 20,
            color: Colors.text,
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <ButtonComponent
          onPress={() => handleTabChange('Fish')}
          title="Fish"
          color="#4287f5"
          style={styles.headerButton}
          textStyle={{
            fontSize: 20,
            color: Colors.text,
            fontWeight: 'bold',
          }}
        />
        <ButtonComponent
          onPress={() => handleTabChange('Tanks')}
          title="Tanks"
          color="#4287f5"
          style={styles.headerButton}
          textStyle={{
            fontSize: 20,
            color: Colors.text,
            fontWeight: 'bold',
          }}
        />
        <ButtonComponent
          onPress={() => handleTabChange('Plants')}
          title="Plants"
          color="#4287f5"
          style={styles.headerButton}
          textStyle={{
            fontSize: 20,
            color: Colors.text,
            fontWeight: 'bold',
          }}
        />
        <ButtonComponent
          onPress={() => handleTabChange('Reminders')}
          title="Reminders"
          color="#4287f5"
          style={styles.headerButton}
          textStyle={{
            fontSize: 20,
            color: Colors.text,
            fontWeight: 'bold',
          }}
        />
      </View>
      {/*<ButtonComponent
        title='Search'
        style={styles.searchBar}
        />*/}
      {renderContent()}
    </View>
  );
  /*
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
      <StatusBar hidden={true} />
      <View style={styles.container}>
          <View style={styles.HomeHeaderContainer}>
            <Text style={styles.header1}>Hi Bradley!</Text>
            <Text style={styles.header2}>Your tanks are all healthy.</Text>
            <Text style={styles.header2}>You have no reminders.</Text>

            <View style={styles.buttonContainer}>
              <Text
                style={[styles.tab, activeTab === 'Dashboard' && styles.activeTab]}
                onPress={() => handleTabChange('Dashboard')}>
                Dashboard</Text>
              <Text
                style={[styles.tab, activeTab === 'My Tanks' && styles.activeTab]}
                onPress={() => handleTabChange('My Tanks')}>
                My Tanks</Text>
              <Text
                style={[styles.tab, activeTab === 'Reminders' && styles.activeTab]}
                onPress={() => handleTabChange('Reminders')}>
                Reminders</Text>
              <Text
                style={[styles.tab, activeTab === 'Settings' && styles.activeTab]}
                onPress={() => handleTabChange('Settings')}>
                Settings</Text>
            </View>

          </View>
          {renderContent()}
        
        
        <GridList style={styles.gridList} />
      </View>
    </SafeAreaView>
  );
  */
};

const TankScreen = ({navigation}) => {

  const [showListFish, setShowListFish] = useState(true);
  const [showListPlants, setShowListPlants] = useState(false);
  const [showListReminders, setShowListReminders] = useState(false);

  const showList = (listNumber) => {
    setShowListFish(listNumber === 1);
    setShowListPlants(listNumber === 2);
    setShowListReminders(listNumber === 3);
  };

  return (
    <View /*style={styles.container}*/>
      <StatusBar hidden={true} />
      <View style={styles.tankInfo}>
        <View style={styles.tankImage}></View>
        <Text style={styles.tankHeader}>Tank #1</Text>
        <View>
          <Text style={styles.tankSize}>Gallons: 26</Text>
          <Text style={styles.tankStatus}>Status: Healthy</Text>
        </View>
      </View>

      <View>
        <BezierChart/>
      </View>


      <View style={styles.buttonContainer}>
        <ButtonComponent
          onPress={() => showList(1)}
          title="Fish"
          color="#4287f5"
        />
        <ButtonComponent
          onPress={() => showList(2)}
          title="Plants"
          color="#4287f5"
        />
        <ButtonComponent
          onPress={() => showList(3)}
          title="Extra"
          color="#4287f5"
          borderRadius="10"
        />
      </View>

      {showListFish && (
        <View style={styles.listContainer}>
          <Text>Fish List</Text>
        </View>
      )}
      {showListPlants && (
        <View style={styles.listContainer}>
          <Text>Plant List</Text>
        </View>
      )}
      {showListReminders && (
        <View style={styles.listContainer}>
          <Text>Reminder List</Text>
        </View>
      )}


      
    </View>

    
  );
};

const styles = StyleSheet.create({
  header: {
    height: Platform.OS === 'android' ? 50 : 40,
    width: '100%',
    backgroundColor: TanksColors.headerBackground,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: Colors.backgroundTanks,
    alignItems: 'center',
    width: '100%',
    paddingTop: Platform.OS === 'android' ? 60 : 0,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 10,
    width: '80%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexHoz: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  header1: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  header2: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
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
  searchBar: {
    width: '80%',
    height: 40,
    marginTop: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: Colors.searchBar,
    shadowColor: '#A4A4A4',
    elevation: 5, // This property is required for Android
    shadowDx: 0,
    shadowDy: 0,
    shadowRadius: 15,
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
    color: Colors.dark
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
  headerButton: {
    width: '22%',
    aspectRatio: 1,
    backgroundColor: 'blue',
  },

  
});


export default MyStack;
