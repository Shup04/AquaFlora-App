import React from 'react';
import { View, Text } from 'react-native';
import { Colors } from '../../Colors';
import { ParentStyles } from '../../Styles/ParentStyles';

export const PlantsScreen = ({ navigation }) => {
  return (
    <View style={ParentStyles.Background}>
      <View style={ParentStyles.Container}>
        <Text style={ParentStyles.Header}>Plants Coming Soon</Text>
      </View>
    </View>
  );
};