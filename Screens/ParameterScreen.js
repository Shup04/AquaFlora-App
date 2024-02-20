import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Modal, TextInput, KeyboardAvoidingView } from 'react-native';
import { BlurView } from 'expo-blur';
import { Colors } from '../Colors';
import { LineChart } from 'react-native-gifted-charts';
import realm from '../database/Realm';
import uuid from 'react-native-uuid';
import { v4 as uuidv4 } from 'uuid';

export const ParameterScreen = ({ route }) => {

  const { tankId } = route.params;

  const [tempNitrate, setTempNitrate] = useState('');
  const [tempNitrite, setTempNitrite] = useState('');
  const [tempAmmonia, setTempAmmonia] = useState('');
  const [tempPh, setTempPh] = useState('');

  const [nitrates, setNitrates] = useState([]);
  const [nitrites, setNitrites] = useState([]);
  const [ammonia, setAmmonia] = useState([]);
  const [ph, setPh] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [dbChange, setDbChange] = useState(false);

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
    
    //Set date accounting for timezone
    let now = new Date();
    let date = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));

    date.setDate(date.getDate() + Math.random() * 100);

    let value1 = Math.floor(Math.random() * 25 + 50)
    let value2 = Math.floor(Math.random() * 20 + 30)
    let value3 = Math.floor(Math.random() * 19 + 10)
    let value4 = Math.floor(Math.random() * 23 + 40)

    realm.write(() => {
      realm.create('WaterParameter', {
        id: uuid.v4(),
        parameterName: 'nitrate',
        value: value1,
        date: date,
        tankId: tankId,
      });
    });
    realm.write(() => {
      realm.create('WaterParameter', {
        id: uuid.v4(),
        parameterName: 'nitrite',
        value: value2,
        date: date,
        tankId: tankId,
      });
    });
    realm.write(() => {
      realm.create('WaterParameter', {
        id: uuid.v4(),
        parameterName: 'ammonia',
        value: value3,
        date: date,
        tankId: tankId,
      });
    });
    realm.write(() => {
      realm.create('WaterParameter', {
        id: uuid.v4(),
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
    } catch (error) {
      console.error(`Error clearing schema 'WaterParameter':`, error);
    }
  };
  useEffect(() => {
    
    //fetch and set params from realm

    
    //clearRealm()
    for (let i=0; i<30; i++) {
      //addParam()
    }
    

    realm.addListener('change', () => {
      setDbChange(!dbChange);
    })
    const allParams = realm.objects('WaterParameter');
    //console.log(allParams);

    const nitrateArray = fetchParameterData(allParams).nitrateArray
    const ammoniaArray = fetchParameterData(allParams).ammoniaArray
    const nitriteArray = fetchParameterData(allParams).nitriteArray
    const phArray = fetchParameterData(allParams).phArray
    
    setNitrates(nitrateArray)
    setAmmonia(ammoniaArray)
    setNitrites(nitriteArray)
    setPh(phArray)
  }, [dbChange]);

  const finalNitrate = setupData(nitrates, nitrites, ammonia, ph).finalData1
  console.log(finalNitrate);
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

  handleCloseModal = () => {
    setModalVisible(false);
  }

  handleParamEntry = (nitrate, nitrite, ammonia, ph) => {
    console.log(nitrate, nitrite, ammonia, ph)
    //let date = new Date();
    //console.log('Current Date: ' + date);
    

    let now = new Date();
    let date = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
    date.setDate(date.getDate() + 3);

    const addParameter = (parameterName, value) => {

      realm.write(() => {
        realm.create('WaterParameter', {
          id: uuid.v4(),
          parameterName: parameterName,
          value: parseInt(value),
          date: date,
          tankId: tankId,
        });
      });

      console.log(`${parameterName}: ${value} added at date: ${date}`);
    };

    if (nitrate !== '') addParameter('nitrate', nitrate);
    if (nitrite !== '') addParameter('nitrite', nitrite);
    if (ammonia !== '') addParameter('ammonia', ammonia);
    if (ph !== '') addParameter('ph', ph);
  }

  return (
    <View style={styles.body}>
      <View style={styles.container}>
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
                    justifyContent:'space-between',
                    padding: 10,
                    marginLeft: 22
                  }}>
                  <Text style={{color: 'lightgray',fontSize:14}}>{(items[0].date.getDate()).toString()} {getMonthName(items[0].date)} {items[0].date.getFullYear()}</Text>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{color: 'lightgray',fontSize:12}}>Nitrate</Text>
                    <Text style={{color: '#ffc2a1', fontWeight:'bold'}}>{items[0].value}</Text>
                  </View>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{color: 'lightgray',fontSize:12}}>Nitrite</Text>
                    <Text style={{color: '#a2fae9', fontWeight:'bold'}}>{items[1].value}</Text>
                  </View>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{color: 'lightgray',fontSize:12}}>Ammonia</Text>
                    <Text style={{color: '#fcffa1', fontWeight:'bold'}}>{items[2].value}</Text>
                  </View>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{color: 'lightgray',fontSize:12}}>Ph</Text>
                    <Text style={{color: '#d3a2fa', fontWeight:'bold'}}>{items[3].value}</Text>
                  </View>
                </View>
              );
            },
          }}
          />
    
          <View style={styles.legend}>
            {parameters.map((param, index) => (
              <LegendItem key={index} color={param.color} text={param.text} />
            ))}
            
          </View>

          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.plusButton}>
            <Text style={styles.plusButtonText}>+</Text>
          </TouchableOpacity>
        
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCloseModal}
        >
          <BlurView style={modalStyles.centeredView} tint={'dark'}>
            <View style={modalStyles.modalView}>
              <Text style={modalStyles.modalTitle}>Add Params:</Text>
              <Text style={modalStyles.modalText}>Nitrate</Text>
              <TextInput
                style={modalStyles.textInput}
                keyboardType='numeric'
                placeholder='Enter Nitrate'
                placeholderTextColor={Colors.textMarine}
                onChangeText={setTempNitrate}
              />
              <Text style={modalStyles.modalText}>Nitrite</Text>
              <TextInput
                style={modalStyles.textInput}
                keyboardType='numeric'
                placeholder='Enter Nitrite'
                placeholderTextColor={Colors.textMarine}
                onChangeText={setTempNitrite}
              />
              <Text style={modalStyles.modalText}>Ammonia</Text>
              <TextInput
                style={modalStyles.textInput}
                keyboardType='numeric'
                placeholder='Enter Ammonia'
                placeholderTextColor={Colors.textMarine}
                onChangeText={setTempAmmonia}
              />
              <Text style={modalStyles.modalText}>Ph</Text>
              <TextInput
                style={modalStyles.textInput}
                keyboardType='numeric'
                placeholder='Enter Ph'
                placeholderTextColor={Colors.textMarine}
                onChangeText={setTempPh}
              />
              <TouchableOpacity onPress={() => handleParamEntry(tempNitrate, tempNitrite, tempAmmonia, tempPh)} style={modalStyles.button}>
                <Text style={modalStyles.modalText}>Add Entry</Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </Modal>

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
      width: '90%',
      height: 40,
      borderRadius: 10,
      marginTop: 15,
      backgroundColor: Colors.height4,
      justifyContent: 'center',
      alignItems: 'center',
    },
    plusButtonText: {
      fontSize: 24,
      color: Colors.textMarine,
    },

});

const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#FFFFFF',
  },
  modalView: {
    height: '55%',
    width: '80%',
    margin: 20,
    backgroundColor: Colors.height3,
    //backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 35,
    //alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textMarine,
    marginBottom: 15,
    textAlign: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
    //textAlign: "center",
    color: Colors.textMarine,
  },
  button: {
    borderRadius: 5,
    elevation: 2,
    backgroundColor: Colors.height4,
    width: '50%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 10,
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 16,
    color: Colors.textMarine,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: '20%',
    //justifyContent: 'flex-end',
    alignItems: 'center',
    //backgroundColor: 'green',
    marginBottom: 0,
    marginTop: 'auto',
  },
  textInput: {
    borderRadius: 5,
    elevation: 2,
    backgroundColor: Colors.height4,
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignSelf: 'center',
    paddingLeft: 10,
    marginBottom: 10,
  }
});