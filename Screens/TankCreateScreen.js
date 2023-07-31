import React from 'react';
import { View, Text, StyleSheet, 
  TextInput, TouchableOpacity } from 'react-native';
import { TanksColors } from '../Colors';
import { BackButton } from '../Components/BackButton';
import ImagePicker from 'react-native-image-picker';
import realm from '../Realm';

export const TankCreateScreen = ({ navigation }) => {

  const [tankName, setTankName] = React.useState('');
  const [tankSize, setTankSize] = React.useState('');
  const [tankDesc, setTankDesc] = React.useState('');
  const [tankImage, setTankImage] = React.useState(null);

  const saveToRealm = () => {
    realm.write(() => {
      realm.create('Tank', {name: tankName, size: tankSize, desc: tankDesc});
    });
    setTankName('');
    setTankSize('');
    setTankDesc('');
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