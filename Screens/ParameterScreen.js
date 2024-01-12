import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import realm from '../database/Realm';

export const ParameterScreen = () => {
  const [parameters, setParameters] = useState([]);

  useEffect(() => {
    // Connect to your Realm database and fetch the parameters
    //const realm = new Realm({ schema: [waterParameter] });
    //const fetchedParameters = realm.objects('WaterParameter');
    const allReminders = realm.objects('WaterParameter')
    //setParameters(fetchedParameters);
  }, []);

  return (
    <View>
      <Text>Parameter Screen</Text>
      <LineChart
        data={parameters}
        xKey="timestamp" // Assuming you have a "timestamp" field in your Parameter schema
        yKey="value" // Assuming you have a "value" field in your Parameter schema
      />
    </View>
  );
};
