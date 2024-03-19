import React, { useEffect, useState } from 'react';
import { ScrollView, Image, View, Text, StyleSheet, Animated } from 'react-native';
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
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading';


const screenWidth = Dimensions.get('window').width;
const chartWidth = screenWidth * 0.75; // 80% of screen width


export const TankScreen = ({ navigation,  route }) => {
  const { tankId } = route.params;
  const { tankName } = route.params;
  console.log(route.params)
  const [tankURI, setTankURI] = useState('');
  const [status, setStatus] = useState('Good');

  const scrollY = new Animated.Value(0);

  // Interpolate the scroll value to an opacity value
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100], // Adjust these numbers to control when the fade starts and ends
    outputRange: [0, 0.7],
    extrapolate: 'clamp', // This ensures the opacity doesn't go below 0 or above 1
  });

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

      <View style={styles.Header}>
        <Animated.View style={[styles.headerBackground, { opacity: headerOpacity }]} />
        <BackButton navigation={navigation}/>
      </View>
      
      
      
      <View style={styles.container}>
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          scrollEventThrottle={16} // Defines how often the scroll event is fired
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false } // Set to true if you're only animating opacity or transform for better performance
          )}
        >
        
          {tankURI && (//only render image if tankURI was fetched.
            <Image
              source={{ uri: tankURI}}
              style={{
                width: '100%',
                height: 275,
                resizeMode: 'cover',
                //marginTop: -30
              }}
            />
          )}
          <Text style={styles.title}> {tankName} </Text>
          <Text style={styles.title}>Status: {status} </Text>

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
  Header: {
    position: 'absolute',
    zIndex: 1,
    top: 30,
    width: '100%',
    height: 100,
    paddingTop: 40,
    paddingHorizontal: 10,
  },
  headerBackground: {
    ...StyleSheet.absoluteFillObject, // This will fill the parent's dimensions
    backgroundColor: Colors.height1,
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
    fontSize: 24,
    width: '90%',
    color: Colors.textWhite,
    fontWeight: 'normal',
    marginTop: 20,
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