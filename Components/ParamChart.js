import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { Colors } from '../Colors';
import { LineChart } from 'react-native-gifted-charts';
import { Dimensions } from 'react-native';

export const ParamChart = ({ }) => {

  const screenWidth = Dimensions.get('window').width;
  const chartWidth = screenWidth * 0.65;

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
    { value:20, data: '10 Oct 2023'}
  ]
  return (
    <LineChart
            areaChart
            curved
            rotateLabel
            data={data}
            data2={lineData2}
            height={200}
            spacing={chartWidth / data.length}
            initialSpacing={10}
            color1="red"
            color2="orange"
            hideDataPoints
            startFillColor1="red"
            startFillColor2="orange"
            endFillColor1="red"
            endFillColor2="orange"
            startOpacity={0.5}
            endOpacity={0.1}
            xAxisColor="white"
            yAxisColor="white"
            yAxisTextStyle={{color: 'white'}}
            rulesType='solid'
            rulesColor={"#EEEEEE55"}
            verticalLinesColor={"#EEEEEE33"}
            noOfSections={5}
            />
  );
};