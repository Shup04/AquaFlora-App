import React, { useEffect } from 'react';
import { platform } from 'react-native';
import { View, Text, StyleSheet, 
  TextInput, TouchableOpacity } from 'react-native';
import { TanksColors } from '../Colors';
import { BackButton } from '../Components/BackButton';
import realm from '../database/Realm';

//permissions and image picker imports
import { PermissionsAndroid } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export const TankCreateScreen = ({ navigation }) => {

  const [tankName, setTankName] = React.useState('.');
  const [tankSize, setTankSize] = React.useState('');
  const [tankDesc, setTankDesc] = React.useState('');
  const [tankImage, setTankImage] = React.useState(null);

  const saveToRealm = () => {
    try{
      const tankObjects = realm.objects('Tank'); //get all tanks
      const sortedTankObjects = tankObjects.sorted('id', true); //sort tanks by id
      const lastTank = sortedTankObjects.length > 0 ? sortedTankObjects[0] : null; //get last tank
      const nextId = lastTank ? lastTank.id + 1 : 1; //increment last tanks id
  
      realm.write(() => {
        realm.create('Tank', { id: nextId, name: tankName, size: tankSize, desc: tankDesc});
      });
      setTankName('');
      setTankSize('');
      setTankDesc('');
    } catch (error) {
      console.error('Error saving to Realm database:', error);
    }
    
  };

  const printRealm = () => {
    try {
      // Get all data from the 'Tank' schema
      const allTanks = realm.objects('Tank');
  
      // Print the data
      console.log('Database content:');
      allTanks.forEach((tank) => {
        console.log(`Name: ${tank.name}, Size: ${tank.size}, Description: ${tank.desc}`);
      });
    } catch (error) {
      console.error('Error reading from Realm database:', error);
    }
  };

  const clearRealm = () => {
    try {
      realm.write(() => {
        const objectsToDelete = realm.objects('Tank');
        realm.delete(objectsToDelete);
      });
      console.log(`All objects in schema '${'Tank'}' have been cleared.`);
    } catch (error) {
      console.error(`Error clearing schema '${'Tank'}':`, error);
    }
  };



  return (
  <View style={styles.body}>
    <BackButton navigation={navigation} />
    <View style={styles.container}>
      <Text style={styles.title}>Create New Tank:</Text>
      
      <View style={styles.box}>
        <Text style={styles.boxText}>Tank Name:</Text>
        <TextInput
          value={tankName}
          onChangeText={(tankName) => setTankName(tankName)}
          style={styles.input}
        />
      </View>
      <View style={styles.box}>
        <Text style={styles.boxText}>Tank Size (gallons):</Text>
        <TextInput
          value={tankSize}
          onChangeText={(tankSize) => setTankSize(tankSize)}
          style={styles.input}
        />
      </View>
      <View style={styles.box}>
        <Text style={styles.boxText}>Tank Description:</Text>
        <TextInput
          value={tankDesc}
          onChangeText={(tankDesc) => setTankDesc(tankDesc)}
          style={styles.input}
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
  </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: TanksColors.backgroundTanks,
    height: '100%',
    width: '100%',
    flex: 1,
    alignItems: 'flex-start',
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
    height: 75,
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