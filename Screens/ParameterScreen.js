import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../Colors';
import { LineChart } from 'react-native-gifted-charts';
import realm from '../database/Realm';

export const ParameterScreen = () => {
  const [parameters, setParameters] = useState([]);

  const screenWidth = Dimensions.get('window').width;
  const chartWidth = screenWidth * .85;

  useEffect(() => {
    // Connect to your Realm database and fetch the parameters
    //const realm = new Realm({ schema: [waterParameter] });
    //const fetchedParameters = realm.objects('WaterParameter');
    const allParams = realm.objects('WaterParameter')
    setParameters(allParams);
  }, []);

const data = [ 
    { value:30, data: '1 Sept 2023', label: 'Sept', labelTextStyle: {color: 'white', width: 50}}, 
    { value:30, data: '2 Sept 2023'}, 
    { value:30, data: '3 Sept 2023'},
    { value:30, data: '4 Sept 2023'},
    { value:30, data: '5 Sept 2023'},
    { value:30, data: '6 Sept 2023'},
    { value:45, data: '7 Sept 2023'}, 
    { value:45, data: '8 Sept 2023'}, 
    { value:45, data: '9 Sept 2023'},
    { value:45, data: '10 Sept 2023'}, 
    { value:45, data: '11 Sept 2023'},
    { value:45, data: '12 Sept 2023'},
    { value:45, data: '13 Sept 2023'},
    { value:20, data: '14 Sept 2023'}, 
    { value:20, data: '15 Sept 2023'}, 
    { value:20, data: '16 Sept 2023'}, 
    { value:20, data: '17 Sept 2023'}, 
    { value:20, data: '18 Sept 2023'}, 
    { value:20, data: '19 Sept 2023'}, 
    { value:20, data: '20 Sept 2023'}, 
    { value:35, data: '21 Sept 2023'}, 
    { value:35, data: '22 Sept 2023'}, 
    { value:35, data: '23 Sept 2023'}, 
    { value:35, data: '24 Sept 2023'}, 
    { value:35, data: '25 Sept 2023'}, 
    { value:35, data: '26 Sept 2023'}, 
    { value:35, data: '27 Sept 2023'}, 
    { value:35, data: '28 Sept 2023'}, 
    { value:35, data: '29 Sept 2023'}, 
    { value:55, data: '30 Sept 2023'}, 
    { value:55, label: 'Oct', labelTextStyle: {color: 'white', width: 50}, data: '1 Oct 2023'}, 
    { value:55, data: '2 Oct 2023'}, 
    { value:55, data: '3 Oct 2023'}, 
    { value:55, data: '4 Oct 2023'}, 
    { value:55, data: '5 Oct 2023'}, 
    { value:55, data: '6 Oct 2023'}, 
    { value:20, data: '7 Oct 2023'}, 
    { value:20, data: '8 Oct 2023'}, 
    { value:20, data: '9 Oct 2023'}, 
    { value:20, data: '10 OC 2023'}
  ]
  const ptData = [
    {value: 16, date: '1 Apr 2022'},
    {value: 18, date: '2 Apr 2022'},
    {value: 19, date: '3 Apr 2022'},
    {value: 18, date: '4 Apr 2022'},
    {value: 14, date: '5 Apr 2022'},
    {value: 14, date: '6 Apr 2022'},
    {value: 16, date: '7 Apr 2022'},
    {value: 20, date: '8 Apr 2022'},
  
    {value: 22, date: '9 Apr 2022'},
    {
      value: 24,
      date: '10 Apr 2022',
      label: '10 Apr',
      labelTextStyle: {color: 'lightgray', width: 60},
    },
    {value: 28, date: '11 Apr 2022'},
    {value: 26, date: '12 Apr 2022'},
    {value: 34, date: '13 Apr 2022'},
    {value: 38, date: '14 Apr 2022'},
    {value: 28, date: '15 Apr 2022'},
    {value: 39, date: '16 Apr 2022'},
  
    {value: 37, date: '17 Apr 2022'},
    {value: 28, date: '18 Apr 2022'},
    {value: 29, date: '19 Apr 2022'},
    {
      value: 30,
      date: '20 Apr 2022',
      label: '20 Apr',
      labelTextStyle: {color: 'lightgray', width: 60},
    },
    {value: 28, date: '21 Apr 2022'},
    {value: 29, date: '22 Apr 2022'},
    {value: 26, date: '23 Apr 2022'},
    {value: 25, date: '24 Apr 2022'},
  
    {value: 19, date: '25 Apr 2022'},
    {value: 22, date: '26 Apr 2022'},
    {value: 20, date: '27 Apr 2022'},
    {value: 23, date: '28 Apr 2022'},
    {value: 21, date: '29 Apr 2022'},
    {
      value: 20,
      date: '30 Apr 2022',
      label: '30 Apr',
      labelTextStyle: {color: 'lightgray', width: 60},
    },
    {value: 24, date: '1 May 2022'},
    {value: 25, date: '2 May 2022'},
    {value: 28, date: '3 May 2022'},
    {value: 25, date: '4 May 2022'},
    {value: 21, date: '5 May 2022'},
  ];

  return (
    <View style={styles.body}>
        <View style={styles.container}>
        <LineChart
            areaChart
            isAnimated
            data={data}
            data2={ptData}
            height={400}
            width={chartWidth}
            spacing={20}
            endSpacing={0}
            initialSpacing={0}

            color1="#8a56ce"
            color2="#56acce"
            startFillColor1="#8a56ce"
            startFillColor2="#56acce"
            endFillColor1="#8a56ce"
            endFillColor2="#56acce"

            hideDataPoints
            startOpacity={0.5}
            endOpacity={0.1}
            xAxisColor={'lightgray'}
            
            yAxisThickness={0}
            yAxisTextStyle={{color: 'white'}}
            rulesType='solid'
            rulesColor={"#EEEEEE55"}
            verticalLinesColor={"#EEEEEE33"}
            maxValue={100}
            noOfSections={4}
            />
        </View>
    </View>
  );
};

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
      //marginBottom: 30,
      marginTop: 50,

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