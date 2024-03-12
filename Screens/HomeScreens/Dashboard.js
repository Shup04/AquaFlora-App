import React from 'react';
import { View, Text } from 'react-native';
import { Colors } from '../../Colors';
import { ParentStyles } from '../../Styles/ParentStyles';

export const DashboardScreen = ({ navigation }) => {
  return (
    <View style={ParentStyles.Background}>
      <Text style={ParentStyles.Header}>DashBoard Coming Soon</Text>
    </View>
  );
};