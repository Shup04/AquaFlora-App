import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ImageBackground, Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import ButtonComponent from './Components/ButtonComponent';
import TankButton from './Components/TankButton';
import profileButton from './Components/ProfileButton';
import BezierChart from './Components/BezierChart';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import GridList from './Components/GridList';
import { Colors, TanksColors } from './Colors';
import Modal from 'react-native-modal';
import Popup from './Popup';

import { FishContent } from './Homepage Content/FishContent';
import { TanksContent } from './Homepage Content/TanksContent';
import { PlantsContent } from './Homepage Content/PlantsContent';
import { RemindersContent } from './Homepage Content/RemindersContent';
import { TankScreen } from './Screens/TankScreen';

import { SafeAreaView } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();
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

  const [activeTab, setActiveTab] = useState('Tanks');

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const renderContent = ({navigation}) => {
    switch (activeTab) {
      case 'Fish':
        return <FishContent />;
      case 'Tanks':        
        return <TanksContent navigation={navigation}  />;
      case 'Plants':
        return <PlantsContent />;
      case 'Reminders':
        return <RemindersContent />;
      default:
        return null;
    }
  };

  const [isModalVisible, setModalVisible] = useState(false);
  const [tankName, setTankName] = useState('');
  const [tankSize, setTankSize] = useState('');
  const [tankDesc, setTankDesc] = useState('');

  const handleSaveData = async () => {
    const realm = await Realm.open({ schema: [MySchema] });
    realm.write(() => {
      const newObject = realm.create('MySchema', {
        tankDesc,
        tankName,
        tankSize,
      });
    });
    realm.close();

    // Reset input values and close the modal
    setTankName('');
    setTankSize('');
    setTankDesc('');
    setModalVisible(false);
  };


  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
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
      {renderContent( navigation={navigation} )}
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
