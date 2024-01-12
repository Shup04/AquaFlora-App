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

  return (
    <View style={styles.body}>
      <LineChart
          areaChart
          isAnimated
          data={data}
          //data2={lineData2}
          //height={85}
          width={chartWidth}
          spacing={chartWidth/data.length}
          endSpacing={0}
          initialSpacing={0}



          hideDataPoints
          startOpacity={0.5}
          endOpacity={0.1}
          xAxisColor={Colors.textMarine}
          yAxisColor={Colors.textMarine}
          yAxisTextStyle={{color: 'white'}}
          rulesType='solid'
          rulesColor={"#EEEEEE55"}
          verticalLinesColor={"#EEEEEE33"}
          maxValue={60}
          noOfSections={2}
        />
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