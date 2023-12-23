import React, { useEffect } from 'react';
import { ScrollView, Image, View, Text, StyleSheet } from 'react-native';
import { Colors } from '../Colors';
import { BackButton } from '../Components/BackButton';
import { ParamChart } from '../Components/ParamChart';
import { Dimensions } from 'react-native';
import { PlusComponent } from '../Components/ItemComponent';
import { RemindersContent } from '../RemindersContent';

import realm from '../database/Realm';
import { TankSchema } from '../database/schemas';

const screenWidth = Dimensions.get('window').width;
const chartWidth = screenWidth * 0.75; // 80% of screen width


export const TankScreen = ({ navigation, route }) => {
  const { tankId } = route.params;
  const [tankURI, setTankURI] = React.useState('');

  useEffect(() => {
    // Query for the tank with the given id
    const tank = realm.objectForPrimaryKey('Tank', tankId);

    // Set the tank URI in state
    if (tank) {
      setTankURI(tank.URI);
    }
  }, [tankId]);

  return (
  <View style={styles.body}>
    <BackButton navigation={navigation}/>
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={{ uri: tankURI}}
          style={{
            width: '100%',
            height: 175,
            resizeMode: 'cover',
            backgroundColor: 'blue',
          }}
        />
        <Text style={styles.title}>Param Chart: </Text>
        <ParamChart/>
        <Text style={styles.title}>Reminders: </Text>
        <RemindersContent navigation={navigation}></RemindersContent>

        
      </ScrollView>
    </View>
    
  </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.backgroundDark,
    width: '100%',
    flex: 1,
    alignItems: 'flex-start',
    width: '100%',
    paddingTop: Platform.OS === 'android' ? 60 : 0,
    paddingBottom: 60
  },
  container: {
    width: '100%',
    height: '100%',
    paddingTop: 50,
    //alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 60,
  },
  title: {
    fontSize: 30,
    width: '90%',
    color: Colors.textWhite,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 30,
  },
});