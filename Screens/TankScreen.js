import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TanksColors } from '../Colors';
import { BackButton } from '../Components/BackButton';

export const TankScreen = ({ navigation, route }) => {
  const { tankId } = route.params;

  return (
  <View style={styles.body}>
    <BackButton navigation={navigation}/>
    <View style={styles.container}>
      <Text style={styles.title}>Tank ID: {tankId}</Text>
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