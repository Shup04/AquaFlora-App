import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import { TanksColors } from '../Colors';
import { BackButton } from '../Components/BackButton';
import { ParamChart } from '../Components/ParamChart';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const chartWidth = screenWidth * 0.75; // 80% of screen width


export const TankScreen = ({ navigation, route }) => {
  const { tankId } = route.params;

  return (
  <View style={styles.body}>
    <BackButton navigation={navigation}/>
    <View style={styles.container}>
      <Image
        source={require('../assets/TankPhotos/whole.jpg')}
        style={{
          width: '100%',
          height: 175,
          resizeMode: 'cover',
          marginBottom: 30,
          backgroundColor: 'blue',
        }}
      />
      <Text style={styles.title}>Tank ID: {tankId}</Text>
      <View style={{ justifyContent: 'center', alignItems: 'center', width: '80%' }}>
        <ParamChart/>
      </View>
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
  container: {
    width: '100%',
    height: '90%',
    paddingTop: 50,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    width: '80%',
    color: TanksColors.text,
    fontWeight: 'bold',
    marginBottom: 30,
  },
});