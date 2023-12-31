import React, { useEffect } from 'react';
import { platform } from 'react-native';
import { View, Text, StyleSheet, 
  TextInput, TouchableOpacity, Button } from 'react-native';
import { TanksColors, Colors } from '../Colors';
import { BackButton } from '../Components/BackButton';
import realm from '../database/Realm';

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export const TankCreateScreen = ({ navigation }) => {

  const [tankName, setTankName] = React.useState('.');
  const [tankSize, setTankSize] = React.useState('');
  const [tankDesc, setTankDesc] = React.useState('');
  const [imageURI, setImageURI] = React.useState(null);

  const saveToRealm = () => {
    try{
      console.log("Saving URI to Realm:", imageURI);

      const tankObjects = realm.objects('Tank'); //get all tanks
      const sortedTankObjects = tankObjects.sorted('id', true); //sort tanks by id
      const lastTank = sortedTankObjects.length > 0 ? sortedTankObjects[0] : null; //get last tank
      const nextId = lastTank ? lastTank.id + 1 : 1; //increment last tanks id

      realm.write(() => {
        
        realm.create('Tank', { 
          id: nextId, 
          name: tankName, 
          size: tankSize, 
          desc: tankDesc,
          URI: imageURI,
        });
      });

      setTankName('');
      setTankSize('');
      setTankDesc('');
      //setImageURI(null);
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
        console.log(`Name: ${tank.name}, Size: ${tank.size}, Description: ${tank.desc}, URI: ${tank.URI}`);
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

  //move selected image to document directory
  const moveImage = async (sourceUri) => {
    const fileName = sourceUri.substring(sourceUri.lastIndexOf('/') + 1);
    const destinationUri = `${FileSystem.documentDirectory}${fileName}`;
  
    await FileSystem.moveAsync({
      from: sourceUri,
      to: destinationUri,
    });
  
    return destinationUri;
  };

  const checkFileExists = async (fileUri) => {
    let fileInfo = await FileSystem.getInfoAsync(fileUri);
    console.log(fileInfo.exists ? "File exists" : "File doesn't exist");
  };

  const pickImage = async () => {
    //pick image
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    //if user picks an image get the URI and save it to realm.
    if (!result.canceled && result.assets && result.assets.length > 0) {
      try {
        const selectedImage = result.assets[0];
        const permanentUri = await moveImage(selectedImage.uri);
        console.log("permanentUri:", permanentUri)
        setImageURI(permanentUri);
        await checkFileExists(permanentUri);
      } catch (error) {
        console.error('Error saving image to document directory:', error);
      }
      

    }
    
  };

  return (
  <View style={styles.body}>
    <BackButton navigation={navigation} />
    <View style={styles.container}>
      <Text style={styles.title}>Create New Tank:</Text>
      
      {/* Old Button.
      <Button title="Pick an Image" onPress={pickImage} />*/}

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
      

      <TouchableOpacity style={[styles.box, styles.createBox]} title="Pick image" onPress={pickImage} >
        <Text style={styles.boxText}>Pick Image</Text>
      </TouchableOpacity>
      
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
    backgroundColor: Colors.backgroundDark,
    height: '100%',
    width: '100%',
    flex: 1,
    alignItems: 'flex-start',
    width: '100%',
    paddingTop: Platform.OS === 'android' ? 60 : 0,
  },
  title: {
    fontSize: 30,
    width: '90%',
    color: Colors.textMarine,
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
    width: '90%',
    height: 75,
    backgroundColor: Colors.height3,
    borderRadius: 8,
    shadowColor: '#A4A4A4',
    elevation: 3,
    marginBottom: 30,
  },
  boxText: {
    color: Colors.textMarine,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
    marginLeft: 10,
  },
  input: {
    color: Colors.textMarine,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: Colors.textWhite,

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