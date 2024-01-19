import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../Colors';
import { LineChart } from 'react-native-gifted-charts';
import realm from '../database/Realm';

export const ParameterScreen = ({ route }) => {

  const { tankId } = route.params;

  const [nitrates, setNitrates] = useState([]);
  const [ammonia, setAmmonia] = useState([]);
  const [nitrites, setNitrites] = useState([]);
  const [ph, setPh] = useState([]);

  const screenWidth = Dimensions.get('window').width;
  const chartWidth = screenWidth * .85;

  useEffect(() => {
    
    //fetch and set params from realm
    clearRealm()
    for (let i=0; i<30; i++) {
      addParam()
    }

    const allParams = realm.objects('WaterParameter').filtered(`tankId = ${tankId}`);

    const nitrateArray = fetchParameterData(allParams).nitrateArray
    const ammoniaArray = fetchParameterData(allParams).ammoniaArray
    const nitriteArray = fetchParameterData(allParams).nitriteArray
    const phArray = fetchParameterData(allParams).phArray

    setNitrates(nitrateArray)
    setAmmonia(ammoniaArray)
    setNitrites(nitriteArray)
    setPh(phArray)
  }, []);
  
  function fetchParameterData(allParams) {
    const nitrateArray = []
    const ammoniaArray = []
    const nitriteArray = []
    const phArray = []

    allParams.forEach((item) => {
      const paramName = item.parameterName
      switch(paramName) {
        case 'nitrate':
          nitrateArray.push(item)
          break;
        case 'ammonia':
          ammoniaArray.push(item)
          break;
        case 'nitrite':
          nitriteArray.push(item)
          break;
        case 'ph':
          phArray.push(item)
          break;
        default:
          break;
      }
    });

    return { 
      nitrateArray: nitrateArray, 
      ammoniaArray: ammoniaArray, 
      nitriteArray: nitriteArray, 
      phArray: phArray 
    };

  }

  function setupData(data1, data2) {

    const organizedData1 = data1.map(item => {
      return{
        value: item.value,
        date: new Date(item.date),
        label: '',
        labelTextStyle: {color: 'white', width: 50}
      }
    })
    const organizedData2 = data2.map(item => {
      return{
        value: item.value,
        date: new Date(item.date),
        label: '',
        labelTextStyle: {color: 'white', width: 50}
      }
    })

    try{
      //fill dates between logs
      const filledData1 = fillMissingDates(organizedData1);
      const filledData2 = fillMissingDates(organizedData2);

      //align dates between params
      const syncedData1 = alignArrays(filledData1, filledData2).alignedArray1
      const syncedData2 = alignArrays(filledData1, filledData2).alignedArray2

      //set month labels
      const finalData1 = setLabels(syncedData1);
      const finalData2 = setLabels(syncedData2);

      return { finalData1: finalData1, finalData2: finalData2 };

    }catch(error){
      console.error(error)
    }
    
    console.log(organizedData1)


    
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


  function alignArrays(array1, array2) {
    // Find the earliest and latest dates in both arrays
    let dates = [...array1, ...array2].map(item => item.date);
    let earliestDate = new Date(Math.min.apply(null, dates));
    let latestDate = new Date(Math.max.apply(null, dates));
  
    // Fill in the missing dates for both arrays
    let alignedArray1 = syncDates(array1, earliestDate, latestDate);
    let alignedArray2 = syncDates(array2, earliestDate, latestDate);
  
    return { alignedArray1: alignedArray1, alignedArray2: alignedArray2 };
  }
  
  function syncDates(array, startDate, endDate) {
    let result = [];
    for (let dt = new Date(startDate); dt <= endDate; dt.setDate(dt.getDate() + 1)) {
      let item = array.find(i => i.date.getTime() === dt.getTime());
      result.push(item ? item : { date: new Date(dt), value: 0 });
    }
    return result;
  }

  function addParam(){
    const allParams = realm.objects('WaterParameter').filtered(`tankId = ${tankId}`);
    const sortedParameterObjects = allParams.sorted('id', true);
    const lastParam = sortedParameterObjects.length > 0 ? sortedParameterObjects[0] : null;
    const nextId = lastParam ? lastParam.id + 1 : 1;

    let date = new Date('2023-12-26')
    date.setDate(date.getDate() + nextId)

    realm.write(() => {
      realm.create('WaterParameter', {
        id: nextId,
        parameterName: 'nitrate',
        value: 30,
        date: date,
        tankId: tankId,
      });
    });
  }

  const clearRealm = () => {
    try {
      realm.write(() => {
        const objectsToDelete = realm.objects('WaterParameter');
        realm.delete(objectsToDelete);
      });
      console.log(`All objects in schema 'Reminder' have been cleared.`);
    } catch (error) {
      console.error(`Error clearing schema 'Reminder':`, error);
    }
  };

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

  const finalData1 = setupData(nitrates, data2).finalData1
  const finalData2 = setupData(nitrates, data2).finalData2

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
        <View style={styles.bar}>
          <View style={styles.legend}>
            <span style={styles.legendItem}/>

          </View>
        </View>
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
      marginTop: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 30,
      width: '90%',
      color: Colors.textWhite,
      fontWeight: 'normal',
      marginTop: 20,
      marginBottom: 30,
    },
    bar: {
      width: '90%',
      height: 50,
      marginTop: 5,
      //backgroundColor: "white",
    },
    legend: {
      width: '75%',
      height: '100%',
      backgroundColor: 'green',
    },
    legendItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: 25,
      height: 25,
      backgroundColor: 'red',
      borderRadius: 8,
    },

  });