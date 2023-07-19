//import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import {
  LineChart,
} from "react-native-chart-kit";
//import Colors from "./App";

const BezierChart = () => {
  return (
    <View style={{margin: 10}}>
      <LineChart
        data={{
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [
            {
              data: [
                Math.random() * 50,
                Math.random() * 50,
                Math.random() * 50,
                Math.random() * 50,
                Math.random() * 50,
                Math.random() * 50
              ]
            }
          ]
        }}
        width={Dimensions.get("window").width * 0.95} // from react-native
        height={220}
        yAxisLabel=""
        yAxisSuffix=" PPM"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "blue",
          backgroundGradientFromOpacity: 0,
          backgroundGradientToOpacity: 0,
          fillShadowGradientFromOpacity: 150,
          fillShadowGradientToOpacity: 255,
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(74, 180, 222, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(52, 92, 167, ${opacity})`,
          propsForBackgroundLines: { strokeWidth: .5, strokeOpacity: 2 },
          style: {
            paddingVertical: 10,
            paddingHorizontal: 16,
            borderRadius: 25,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#737373"
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 25,
    marginVertical: 15,
    width: '30%',
    height: '75%',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default BezierChart;
