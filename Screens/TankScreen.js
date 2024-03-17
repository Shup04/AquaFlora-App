import React, { useEffect, useState } from 'react';
import { ScrollView, Image, View, Text, StyleSheet } from 'react-native';
import { Colors } from '../Colors';
import { BackButton } from '../Components/BackButton';
import { ParamChart } from '../Components/ParamChart';
import { Dimensions } from 'react-native';
import { PlusComponent } from '../Components/ItemComponent';
import { RemindersContent } from '../RemindersContent';
import { PersonalFishContent } from '../Homepage Content/FishContent';

import realm from '../database/Realm';
import { TankSchema } from '../database/schemas';

import { BlurView } from 'expo-blur';
import { StatusBar } from 'react-native';
import { ParentStyles } from '../Styles/ParentStyles';

const screenWidth = Dimensions.get('window').width;
const chartWidth = screenWidth * 0.75; // 80% of screen width


export const TankScreen = ({ navigation,  route }) => {
  const { tankId } = route.params;
  const [tankURI, setTankURI] = useState('');
  const [status, setStatus] = useState('Good');

  useEffect(() => {
    const fetchData = () => {
      // Query for the tank with the given id
      const tank = realm.objectForPrimaryKey('Tank', tankId);

      // Set the tank URI in state
      if (tank && tank.URI) {
        setTankURI(tank.URI);
      }
      
    };

    const getStatus = () => {
      //get params for status check
      const allParams = realm.objects('WaterParameter').filtered(`tankId = ${tankId}`);
      if(allParams != ''){
        const lastNitrate = allParams.filtered('parameterName = "nitrate"').sorted('date', true)[0];
        const lastAmmonia = allParams.filtered('parameterName = "ammonia"').sorted('date', true)[0];
        const lastNitrite = allParams.filtered('parameterName = "nitrite"').sorted('date', true)[0];
        const lastPh = allParams.filtered('parameterName = "ph"').sorted('date', true)[0];
        const highestParam = Math.max(lastNitrate.value, lastAmmonia.value, lastNitrite.value, lastPh.value);
  
        if (highestParam > 75){
          setStatus('Bad');
        } else if(highestParam > 50){
          setStatus('Fair');
        } else { 
          setStatus('Good');
        }
      } else {
        setStatus('No Logged Data');
      }
    }

    getStatus();
    fetchData();
    
    

    // Fetch data every 5 seconds
    const intervalId = setInterval(fetchData, 5000);

    // Clean up the interval when the component unmounts or the dependency changes
    return () => {
      clearInterval(intervalId);
    };
  }, [tankId]);

  return (
  <View style={ParentStyles.Background}>
    <View style={[ParentStyles.Container, {paddingTop: 0}]}>
      
      
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
        
          {tankURI && (//only render image if tankURI was fetched.
            <Image
              source={{ uri: tankURI}}
              style={{
                width: '100%',
                height: 250,
                resizeMode: 'cover',
                //marginTop: -30
              }}
            />
          )}
          <BackButton navigation={navigation}/>
          <Text style={styles.subTitle}>Status: {status} </Text>

          <Text style={styles.title}>Param Chart: </Text>
          <ParamChart navigation={navigation} tankId={tankId}/>

          <Text style={styles.title}>Reminders: </Text>
          <RemindersContent navigation={navigation} tankId={tankId}></RemindersContent>

          <Text style={styles.title}>Fish: </Text>
          {/*<PersonalFishContent navigation={navigation} tankId={tankId}></PersonalFishContent>
          */}
          
        </ScrollView>
      </View>
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
    paddingTop: 30,
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
    fontWeight: 'normal',
    marginTop: 20,
    marginBottom: 30,
  },
  subTitle: {
    fontSize: 24,
    width: '90%',
    color: Colors.textWhite,
    fontWeight: 'normal',
    marginTop: 20,
  },
  BlurView: {
    width: '100%',
    height: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  blurContainer: {
    height: 50,
    backgroundColor: 'green',
  },
});