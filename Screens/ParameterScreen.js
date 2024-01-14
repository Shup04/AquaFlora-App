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

  function setupData(data) {
    const filledData = fillMissingDates(data);
    const finalData = setLabels(filledData);

    return finalData
  }

  function setLabels(data) {
    for(let i = 0; i < data.length; i++) {
      //If the date is the first of the month
      if(data[i].date.getDate() === 1){
        switch(data[i].date.getMonth()) {
          case 0:
            data[i].label = 'Jan';
            break;
          case 1:
            data[i].label = 'Feb';
            break;
          case 2:
            data[i].label = 'Mar';
            break;
          case 3:
            data[i].label = 'Apr';
            break;
          case 4:
            data[i].label = 'May';
            break;
          case 5:
            data[i].label = 'Jun';
            break;
          case 6:
            data[i].label = 'Jul';
            break;
          case 7:
            data[i].label = 'Aug';
            break;
          case 8:
            data[i].label = 'Sep';
            break;
          case 9:
            data[i].label = 'Oct';
            break;
          case 10:
            data[i].label = 'Nov';
            break;
          case 11:
            data[i].label = 'Dec';
            break;
          default:
            data[i].label = 'Jan';

        }
      }
    }
    return data
  }

  function setLabels(data) {
    data.forEach((item, index) => {
      console.log(`Data at index ${index}:`, item.date);
      if (item.date.getDate() === 1) {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        item.label = monthNames[item.date.getMonth()];
      }
    });
    return data;
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

const data = [ 
    { value:30, date: new Date('2023-12-26'), label: '', labelTextStyle: {color: 'white', width: 50} }, 
    { value:32, date: new Date('2023-12-29'), label: '', labelTextStyle: {color: 'white', width: 50}}, 
    { value:35, date: new Date('2023-12-30'), label: '', labelTextStyle: {color: 'white', width: 50}},
    { value:69, date: new Date('2023-12-31'), label: '', labelTextStyle: {color: 'white', width: 50}},
    { value:55, date: new Date('2024-1-2'), label: '', labelTextStyle: {color: 'white', width: 50}}, 
    { value:54, date: new Date('2024-1-3'), label: '', labelTextStyle: {color: 'white', width: 50} }, 
    { value:43, date: new Date('2024-1-4'), label: '', labelTextStyle: {color: 'white', width: 50}}, 
    { value:45, date: new Date('2024-1-6'), label: '', labelTextStyle: {color: 'white', width: 50}}, 
    { value:34, date: new Date('2024-1-10'), label: '', labelTextStyle: {color: 'white', width: 50}}, 
    { value:68, date: new Date('2024-1-13'), label: '', labelTextStyle: {color: 'white', width: 50}}, 
    { value:75, date: new Date('2024-1-14'), label: '', labelTextStyle: {color: 'white', width: 50}}, 
    { value:69, date: new Date('2024-1-15'), label: '', labelTextStyle: {color: 'white', width: 50}}, 
    { value:40, date: new Date('2024-1-17'), label: '', labelTextStyle: {color: 'white', width: 50}}
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

  const finalData1 = setupData(data);

  return (
    <View style={styles.body}>
      <View style={styles.container}>
        {console.log(finalData1)}
        <LineChart
          areaChart
          isAnimated
          data={finalData1}
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
                  <Text style={{color: 'lightgray',fontSize:12}}>{(items[0].date.getDate()).toString()}</Text>
                  <Text style={{color: 'white', fontWeight:'bold'}}>{items[0].value}</Text>

                  <Text style={{color: 'lightgray',fontSize:12, marginTop: 16}}>Ammonia</Text>
                  <Text style={{color: 'lightgray',fontSize:12}}>{items[1].date}</Text>
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