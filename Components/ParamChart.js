import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { Colors } from '../Colors';
import { LineChart } from 'react-native-gifted-charts';
import { Dimensions } from 'react-native';

export const ParamChart = ({ }) => {

  const screenWidth = Dimensions.get('window').width;
  const chartWidth = screenWidth * 0.65;

  const data = [ 
    {value:50},
    {value:10}, 
    {value:40}, 
    {value:30}, 
    {value:20}, 
    {value:60}, 
    {value:50}, 
    {value:10}, 
    {value:40}, 
    {value:30}, {value:20}, {value:60}]
  
  const lineData2 = [ 
    { value:30, data: '1 Sept 2023', label: 'Sept', labelTextStyle: {color: 'white', width: 50}}, 
    { value:15, data: '1 Sept 2023'}, 
    { value:60, data: '3 Sept 2023'},
    { value:10, data: '6 Sept 2023'}, 
    { value:20, data: '10 Sept 2023'}, 
    { value:45, data: '14 Sept 2023'}, 
    { value:30, data: '19 Sept 2023'}, 
    { value:35, data: '29 Sept 2023'}, 
    { value:20, label: 'Oct', labelTextStyle: {color: 'white', width: 50}, data: '1 Oct 2023'}, 
    { value:10, data: '7 Oct 2023'}, 
    { value:60, data: '14 Oct 2023'}, 
    { value:55, data: '23 Oct 2023'}]
  return (
    <LineChart
            areaChart
            curved
            rotateLabel
            data={lineData2}
            //data2={lineData2}
            height={200}
            showVerticalLines
            spacing={chartWidth / data.length}
            initialSpacing={10}
            color1="red"
            color2="orange"
            textColor1="green"
            hideDataPoints
            dataPointsColor1="red"
            dataPointsColor2="red"
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
            rulesColor={"#EEEEEE33"}
            verticalLinesColor={"#EEEEEE33"}
            
            />
  );
};