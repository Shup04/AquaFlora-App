import React from 'react';
import { View, Text } from 'react-native';
import { Colors } from '../../Colors';
import { ParentStyles } from '../../Styles/ParentStyles';

export const FishScreen = ({ navigation }) => {
  return (
    <View style={ParentStyles.Background}>
      <View style={ParentStyles.Container}>
        <Text style={ParentStyles.Header}>FishList Coming Soon</Text>
      </View>
    </View>
  );
};