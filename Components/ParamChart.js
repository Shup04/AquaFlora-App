import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { Colors } from '../Colors';
import { LineChart } from 'react-native-gifted-charts';
import { Dimensions } from 'react-native';
import { styles } from 'react-native-gifted-charts/src/LineChart/styles';
import realm from '../database/Realm';
import { WaterParameterSchema } from '../database/schemas';
import { setupData } from '../functions/ParamSetup';

export const ParamChart = ({ navigation, tankId }) => {

  const screenWidth = Dimensions.get('window').width;
  const chartWidth = screenWidth * 0.69;

  const [Nitrate, setNitrate] = useState([]);
  const [Ammonia, setAmmonia] = useState([]);
  const [Nitrite, setNitrite] = useState([]);
  const [Ph, setPh] = useState([]);

  const lineData2 = [ 
    { value:30, data: '1 Sept 2023', label: 'Sept', labelTextStyle: {color: 'white', width: 50}}, 
    { value:30, data: '2 Sept 2023'}, 
    { value:15, data: '3 Sept 2023'},
    { value:15, data: '4 Sept 2023'},
    { value:15, data: '5 Sept 2023'},
    { value:15, data: '6 Sept 2023'},
    { value:15, data: '7 Sept 2023'}, 
    { value:15, data: '8 Sept 2023'}, 
    { value:20, data: '9 Sept 2023'},
    { value:20, data: '10 Sept 2023'}, 
    { value:20, data: '11 Sept 2023'},
    { value:20, data: '12 Sept 2023'},
    { value:20, data: '13 Sept 2023'},
    { value:20, data: '14 Sept 2023'}, 
    { value:20, data: '15 Sept 2023'}, 
    { value:25, data: '16 Sept 2023'}, 
    { value:25, data: '17 Sept 2023'}, 
    { value:25, data: '18 Sept 2023'}, 
    { value:25, data: '19 Sept 2023'}, 
    { value:25, data: '20 Sept 2023'}, 
    { value:25, data: '21 Sept 2023'}, 
    { value:25, data: '22 Sept 2023'}, 
    { value:20, data: '23 Sept 2023'}, 
    { value:20, data: '24 Sept 2023'}, 
    { value:20, data: '25 Sept 2023'}, 
    { value:20, data: '26 Sept 2023'}, 
    { value:20, data: '27 Sept 2023'}, 
    { value:20, data: '28 Sept 2023'}, 
    { value:20, data: '29 Sept 2023'}, 
    { value:20, data: '30 Sept 2023'}, 
    { value:20, label: 'Oct', labelTextStyle: {color: 'white', width: 50}, data: '1 Oct 2023'}, 
    { value:35, data: '2 Oct 2023'}, 
    { value:35, data: '3 Oct 2023'}, 
    { value:35, data: '4 Oct 2023'}, 
    { value:35, data: '5 Oct 2023'}, 
    { value:35, data: '6 Oct 2023'}, 
    { value:35, data: '7 Oct 2023'}, 
    { value:35, data: '8 Oct 2023'}, 
    { value:20, data: '9 Oct 2023'}, 
    { value:20, data: '10 Oct 2023'}
  ]
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

  const parameters = [
    { color: '#ff8d4f', text: 'Nitrate' },
    { color: '#47fcd8', text: 'Nitrite' },
    { color: '#f9ff59', text: 'Ammonia' },
    { color: '#b04fff', text: 'Ph' },
  ];

  useEffect(() => {

    const allParams = realm.objects('WaterParameter');
    const data1 = setupData(allParams).finalData1;
    const data2 = setupData(allParams).finalData2;
    const data3 = setupData(allParams).finalData3;
    const data4 = setupData(allParams).finalData4;

    setNitrate(data1);
    setAmmonia(data2);
    setNitrite(data3);
    setPh(data4);

  }, []);

  return (
    <View style={styles2.Container}>
      
      <LineChart
          areaChart
          isAnimated
          data={Nitrate}
          data2={Ammonia}
          data3={Nitrite}
          data4={Ph}

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

          height={85}
          width={chartWidth}
          spacing={15}
          endSpacing={0}
          initialSpacing={0}
          hideDataPoints

          startOpacity={0.1}
          endOpacity={0}
          xAxisColor={Colors.textMarine}
          yAxisColor={Colors.textMarine}
          yAxisTextStyle={{color: 'white'}}
          rulesType='solid'
          rulesColor={"#EEEEEE55"}
          verticalLinesColor={"#EEEEEE33"}
          maxValue={100}
          noOfSections={2}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Parameters', {tankId})} style={styles2.box}>
          <Text style={styles2.title}>View</Text>
        </TouchableOpacity>
    </View>
    
    
  );
};

const styles2 = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Colors.height2,
    width: '90%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: Colors.backgroundDark,
    borderRadius: 10,
    paddingLeft: 10,
  },
  box: {
    width: '25%',
    height: 45,
    backgroundColor: Colors.height4,
    borderRadius: 10,
    shadowColor: '#000000',
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: Colors.textMarine,
    fontSize: 18,
  }
});