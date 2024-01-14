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

  function setupData(data1) {
    //setup first data array
    const filledData1 = fillMissingDates(data1);
    const finalData1 = setLabels(filledData1);

    return (finalData1);
  }

  function setLabels(data) {
    // For each entry, check if it is the first day of the month, if it is, set the label to the month name.
    data.forEach((item) => {
      if (item.date.getDate() === 1) {
        item.label = getMonthName(item.date);
        item.labelTextStyle = {color: 'white', width: 50};
      }
    });
    return data;
  }

  function getMonthName(date) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return monthNames[date.getMonth()];
  }

  function fillMissingDates(data) {
    // Sort data by date
    data.sort((a, b) => new Date(a.date) - new Date(b.date));
  
    let filledData = [];
    for (let i = 0; i < data.length; i++) {
      if (i === 0) {
        filledData.push(data[i]);
      } else {
        let prevDate = new Date(filledData[filledData.length - 1].date);
        let currDate = new Date(data[i].date);
        let diffDays = Math.ceil((currDate - prevDate) / (1000 * 60 * 60 * 24));
  
        if (diffDays > 1) {
          for (let j = 1; j < diffDays; j++) {
              let newDate = new Date(prevDate);

              newDate.setDate(newDate.getDate() + j);
              filledData.push({ value: filledData[filledData.length - 1].value, date: new Date(newDate) });
          }
      }
        filledData.push(data[i]);
      }
    }

    const newFilledData = incrementDates(filledData);

    return newFilledData;
  }

  function incrementDates(data) {
    return data.map(item => {
      let newDate = new Date(item.date);
      newDate.setDate(newDate.getDate() + 1);
      return { ...item, date: newDate };
    });
  }

  const data1 = [ 
    { value:30, date: new Date('2023-12-26'), label: '', labelTextStyle: {color: 'white', width: 50} }, 
    { value:32, date: new Date('2023-12-29'), label: '', labelTextStyle: {color: 'white', width: 50}}, 
    { value:35, date: new Date('2023-12-30'), label: '', labelTextStyle: {color: 'white', width: 50}},
    { value:69, date: new Date('2023-12-31'), label: '', labelTextStyle: {color: 'white', width: 50}},
    { value:55, date: new Date('2024-1-3'), label: '', labelTextStyle: {color: 'white', width: 50}}, 
    { value:54, date: new Date('2024-1-4'), label: '', labelTextStyle: {color: 'white', width: 50} }, 
    { value:43, date: new Date('2024-1-5'), label: '', labelTextStyle: {color: 'white', width: 50}}, 
    { value:45, date: new Date('2024-1-6'), label: '', labelTextStyle: {color: 'white', width: 50}}, 
    { value:34, date: new Date('2024-1-10'), label: '', labelTextStyle: {color: 'white', width: 50}}, 
    { value:68, date: new Date('2024-1-13'), label: '', labelTextStyle: {color: 'white', width: 50}}, 
    { value:75, date: new Date('2024-1-14'), label: '', labelTextStyle: {color: 'white', width: 50}}, 
    { value:69, date: new Date('2024-1-15'), label: '', labelTextStyle: {color: 'white', width: 50}}, 
    { value:40, date: new Date('2024-1-16'), label: '', labelTextStyle: {color: 'white', width: 50}},
    { value:30, date: new Date('2024-1-21'), label: '', labelTextStyle: {color: 'white', width: 50} }, 
    { value:32, date: new Date('2024-1-24'), label: '', labelTextStyle: {color: 'white', width: 50}}, 
    { value:35, date: new Date('2024-1-29'), label: '', labelTextStyle: {color: 'white', width: 50}},
    { value:69, date: new Date('2024-1-31'), label: '', labelTextStyle: {color: 'white', width: 50}},
    { value:55, date: new Date('2024-2-3'), label: '', labelTextStyle: {color: 'white', width: 50}}, 
    { value:54, date: new Date('2024-2-4'), label: '', labelTextStyle: {color: 'white', width: 50} }, 
    { value:43, date: new Date('2024-2-5'), label: '', labelTextStyle: {color: 'white', width: 50}}, 
    { value:45, date: new Date('2024-2-6'), label: '', labelTextStyle: {color: 'white', width: 50}}, 
    { value:34, date: new Date('2024-2-10'), label: '', labelTextStyle: {color: 'white', width: 50}}, 
    { value:68, date: new Date('2024-2-13'), label: '', labelTextStyle: {color: 'white', width: 50}}, 
    { value:75, date: new Date('2024-2-14'), label: '', labelTextStyle: {color: 'white', width: 50}}, 
    { value:69, date: new Date('2024-2-15'), label: '', labelTextStyle: {color: 'white', width: 50}}, 
    { value:40, date: new Date('2024-2-16'), label: '', labelTextStyle: {color: 'white', width: 50}}
  ]
  const data2 = [
    {value: 16, date: new Date('2023-12-31'), label: '', labelTextStyle: {color: 'white', width: 50}},
    {value: 18, date: new Date('2024-1-4'), label: '', labelTextStyle: {color: 'white', width: 50}},
    {value: 18, date: new Date('2024-1-8'), label: '', labelTextStyle: {color: 'white', width: 50}},
    {value: 18, date: new Date('2024-1-9'), label: '', labelTextStyle: {color: 'white', width: 50}},
    {value: 18, date: new Date('2024-1-11'), label: '', labelTextStyle: {color: 'white', width: 50}},
    {value: 18, date: new Date('2024-1-13'), label: '', labelTextStyle: {color: 'white', width: 50}},
    {value: 18, date: new Date('2024-1-14'), label: '', labelTextStyle: {color: 'white', width: 50}},
    {value: 18, date: new Date('2024-1-16'), label: '', labelTextStyle: {color: 'white', width: 50}},
    {value: 19, date: new Date('2024-1-18'), label: '', labelTextStyle: {color: 'white', width: 50}},
    {value: 18, date: new Date('2024-1-19'), label: '', labelTextStyle: {color: 'white', width: 50}},
    {value: 14, date: new Date('2024-1-20'), label: '', labelTextStyle: {color: 'white', width: 50}},
    {value: 14, date: new Date('2024-1-23'), label: '', labelTextStyle: {color: 'white', width: 50}},
    {value: 16, date: new Date('2024-1-26'), label: '', labelTextStyle: {color: 'white', width: 50}},
    {value: 20, date: new Date('2024-1-29'), label: '', labelTextStyle: {color: 'white', width: 50}},
    {value: 22, date: new Date('2024-2-1'), label: '', labelTextStyle: {color: 'white', width: 50}},
    {value: 28, date: new Date('2024-2-4'), label: '', labelTextStyle: {color: 'white', width: 50}},
    {value: 26, date: new Date('2024-2-8'), label: '', labelTextStyle: {color: 'white', width: 50}},
    {value: 34, date: new Date('2024-2-10'), label: '', labelTextStyle: {color: 'white', width: 50}},
    {value: 38, date: new Date('2024-2-13'), label: '', labelTextStyle: {color: 'white', width: 50}},
    {value: 28, date: new Date('2024-2-17'), label: '', labelTextStyle: {color: 'white', width: 50}},
    {value: 39, date: new Date('2024-2-20'), label: '', labelTextStyle: {color: 'white', width: 50}},
    {value: 37, date: new Date('2024-2-21'), label: '', labelTextStyle: {color: 'white', width: 50}},
    {value: 28, date: new Date('2024-2-22'), label: '', labelTextStyle: {color: 'white', width: 50}},
    {value: 29, date: new Date('2024-2-23'), label: '', labelTextStyle: {color: 'white', width: 50}},
    {value: 28, date: new Date('2024-2-25'), label: '', labelTextStyle: {color: 'white', width: 50}},
    {value: 29, date: new Date('2024-2-28'), label: '', labelTextStyle: {color: 'white', width: 50}},
    {value: 26, date: new Date('2024-2-30'), label: '', labelTextStyle: {color: 'white', width: 50}},
    {value: 25, date: new Date('2024-3-2'), label: '', labelTextStyle: {color: 'white', width: 50}},
    {value: 19, date: new Date('2024-3-3'), label: '', labelTextStyle: {color: 'white', width: 50}},
    {value: 22, date: new Date('2024-3-5'), label: '', labelTextStyle: {color: 'white', width: 50}},
    {value: 20, date: new Date('2024-3-6'), label: '', labelTextStyle: {color: 'white', width: 50}},
    {value: 23, date: new Date('2024-3-7'), label: '', labelTextStyle: {color: 'white', width: 50}},
    {value: 21, date: new Date('2024-3-9'), label: '', labelTextStyle: {color: 'white', width: 50}},
    {value: 24, date: new Date('2024-3-12'), label: '', labelTextStyle: {color: 'white', width: 50}},
    {value: 25, date: new Date('2024-3-13'), label: '', labelTextStyle: {color: 'white', width: 50}},
    {value: 28, date: new Date('2024-3-15'), label: '', labelTextStyle: {color: 'white', width: 50}},
    {value: 25, date: new Date('2024-3-16'), label: '', labelTextStyle: {color: 'white', width: 50}},
    {value: 21, date: new Date('2024-3-17'), label: '', labelTextStyle: {color: 'white', width: 50}},
  ];


  const finalData1 = setupData(data1)
  const finalData2 = setupData(data2)

  return (
    <View style={styles.body}>
      <View style={styles.container}>
        <LineChart
          areaChart
          isAnimated
          data={finalData1}
          data2={finalData2}
          height={400}
          width={chartWidth}
          spacing={10}
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

          pointerConfig={{
            pointerStripUptoDataPoint: true,
            pointerStripColor: 'lightgray',
            pointerStripWidth: 2,
            strokeDashArray: [2, 5],
            pointerColor: 'lightgray',
            radius: 4,
            pointerLabelWidth: 100,
            pointerLabelHeight: 120,
            activatePointersOnLongPress: true,
            pointerLabelComponent: items => {
              return (
                <View
                  style={{
                    height: 140,
                    width: 100,
                    backgroundColor: Colors.height3,
                    borderRadius: 4,
                    justifyContent:'center',
                    paddingLeft: 10,
                    marginLeft: 22
                  }}>
                  <Text style={{color: 'lightgray',fontSize:12}}>Nitrate</Text>
                  <Text style={{color: 'lightgray',fontSize:12}}>{(items[0].date.getDate()).toString()} {getMonthName(items[0].date)} {items[0].date.getFullYear()}</Text>
                  <Text style={{color: 'white', fontWeight:'bold'}}>{items[0].value}</Text>

                  <Text style={{color: 'lightgray',fontSize:12, marginTop: 12}}>Ammonia</Text>
                  <Text style={{color: 'lightgray',fontSize:12}}>{(items[1].date.getDate()).toString()} {getMonthName(items[1].date)} {items[1].date.getFullYear()}</Text>
                  <Text style={{color: 'white', fontWeight:'bold'}}>{items[1].value}</Text>
                </View>
              );
            },
          }}

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