import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Colors } from '../Colors';
import { LineChart } from 'react-native-gifted-charts';
import realm from '../database/Realm';

export const ParameterScreen = ({ route }) => {

  const { tankId } = route.params;

  const [nitrates, setNitrates] = useState([]);
  const [nitrites, setNitrites] = useState([]);
  const [ammonia, setAmmonia] = useState([]);
  const [ph, setPh] = useState([]);

  const screenWidth = Dimensions.get('window').width;
  const chartWidth = screenWidth * .85;


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

  function setupData(data1, data2, data3, data4) {
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
    const organizedData3 = data3.map(item => {
      return{
        value: item.value,
        date: new Date(item.date),
        label: '',
        labelTextStyle: {color: 'white', width: 50}
      }
    })
    const organizedData4 = data4.map(item => {
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
      const filledData3 = fillMissingDates(organizedData3);
      const filledData4 = fillMissingDates(organizedData4);

      //align dates between params
      const syncedData1 = alignArrays(filledData1, filledData2, filledData3, filledData4).alignedArray1
      const syncedData2 = alignArrays(filledData1, filledData2, filledData3, filledData4).alignedArray2
      const syncedData3 = alignArrays(filledData1, filledData2, filledData3, filledData4).alignedArray3
      const syncedData4 = alignArrays(filledData1, filledData2, filledData3, filledData4).alignedArray4

      //set month labels
      const finalData1 = setLabels(syncedData1);
      const finalData2 = setLabels(syncedData2);
      const finalData3 = setLabels(syncedData3);
      const finalData4 = setLabels(syncedData4);

      return { 
        finalData1: finalData1, 
        finalData2: finalData2,
        finalData3: finalData3,
        finalData4: finalData4 
      };

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

  function alignArrays(array1, array2, array3, array4) {
    // Find the earliest and latest dates in both arrays
    let dates = [...array1, ...array2, ...array3, ...array4].map(item => item.date);
    let earliestDate = new Date(Math.min.apply(null, dates));
    let latestDate = new Date(Math.max.apply(null, dates));
  
    // Fill in the missing dates for both arrays
    let alignedArray1 = syncDates(array1, earliestDate, latestDate);
    let alignedArray2 = syncDates(array2, earliestDate, latestDate);
    let alignedArray3 = syncDates(array3, earliestDate, latestDate);
    let alignedArray4 = syncDates(array4, earliestDate, latestDate);
  
    return { 
      alignedArray1: alignedArray1, 
      alignedArray2: alignedArray2,
      alignedArray3: alignedArray3,
      alignedArray4: alignedArray4 
    };
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
    const nextId1 = lastParam ? lastParam.id + 1 : 1;
    const nextId2 = lastParam ? lastParam.id + 2 : 2;
    const nextId3 = lastParam ? lastParam.id + 3 : 3;
    const nextId4 = lastParam ? lastParam.id + 4 : 4;

    let date = new Date('2023-12-26')
    date.setDate(date.getDate() + nextId1/1.5)

    let value1 = Math.floor(Math.random() * 25 + 50)
    let value2 = Math.floor(Math.random() * 20 + 30)
    let value3 = Math.floor(Math.random() * 19 + 10)
    let value4 = Math.floor(Math.random() * 23 + 40)

    realm.write(() => {
      realm.create('WaterParameter', {
        id: nextId1,
        parameterName: 'nitrate',
        value: value1,
        date: date,
        tankId: tankId,
      });
    });
    realm.write(() => {
      realm.create('WaterParameter', {
        id: nextId2,
        parameterName: 'nitrite',
        value: value2,
        date: date,
        tankId: tankId,
      });
    });
    realm.write(() => {
      realm.create('WaterParameter', {
        id: nextId3,
        parameterName: 'ammonia',
        value: value3,
        date: date,
        tankId: tankId,
      });
    });
    realm.write(() => {
      realm.create('WaterParameter', {
        id: nextId4,
        parameterName: 'ph',
        value: value4,
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
  

/*
  const finalAmmonia = [ 
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
  const finalPh = [
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
*/

  const finalNitrate = setupData(nitrates, nitrites, ammonia, ph).finalData1
  const finalNitrite = setupData(nitrates, nitrites, ammonia, ph).finalData2
  const finalAmmonia = setupData(nitrates, nitrites, ammonia, ph).finalData3
  const finalPh = setupData(nitrates, nitrites, ammonia, ph).finalData4

  const LegendItem = ({ color, text }) => (
    <View style={styles.legendItem}>
      <View style={[styles.legendMarker, { backgroundColor: color }]} />
      <Text style={styles.legendText}>{text}</Text>
    </View>
  );
  
  const parameters = [
    { color: '#ff8d4f', text: 'Nitrate' },
    { color: '#47fcd8', text: 'Nitrite' },
    { color: '#f9ff59', text: 'Ammonia' },
    { color: '#b04fff', text: 'Ph' },
  ];

  return (
    <View style={styles.body}>
      <View style={styles.container}>
        {console.log(ammonia)}
        <LineChart
          areaChart
          isAnimated
          data={finalNitrate}
          data2={finalNitrite}
          data3={finalAmmonia}
          data4={finalPh}
          
          color1={parameters[0].color}
          color2={parameters[1].color}
          color3={parameters[2].color}
          color4={parameters[3].color}
          startFillColor1={parameters[0].color}
          startFillColor2={parameters[1].color}
          startFillColor3={parameters[2].color}
          startFillColor4={parameters[3].color}
          endFillColor1={parameters[0].color}
          endFillColor2={parameters[1].color}
          endFillColor3={parameters[2].color}
          endFillColor4={parameters[3].color}

          hideDataPoints
          startOpacity={0.05}
          endOpacity={0}
          xAxisColor={'lightgray'}

          height={400}
          width={chartWidth}
          spacing={10}
          endSpacing={0}
          initialSpacing={0}
          
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

        <View style={styles.legend}>
          {parameters.map((param, index) => (
            <LegendItem key={index} color={param.color} text={param.text} />
          ))}
          <TouchableOpacity style={styles.plusButton}>
            <Text style={styles.plusButtonText}>+</Text>
          </TouchableOpacity>
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
    legend: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '90%',

      //backgroundColor: 'green'
    },
    legendItem: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    legendMarker: {
      width: 15,
      height: 15,
      borderRadius: 5,
    },
    legendText: {
      color: Colors.textMarine,
      marginLeft: 3,
    },
    plusButton: {
      width: 40,
      height: 40,
      borderRadius: 10,
      backgroundColor: Colors.height4,
      justifyContent: 'center',
      alignItems: 'center',
    },
    plusButtonText: {
      fontSize: 24,
      color: Colors.textMarine,
    },

  });