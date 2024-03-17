import React from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from '../Colors';

export const ParentStyles = StyleSheet.create({
    Background: {
        width: '100%',
        height: '100%',
        //marginTop: -30,
        backgroundColor: Colors.backgroundDark
    },
    Container: {
      width: '100%',
      height: '100%',
      marginTop: Platform.OS === 'android' ? -30 : 0,
      paddingVertical: 30,
    },
    Header: {
      fontSize: 24,
      fontWeight: 'bold',
      margin: 10,
      marginTop: 20,
      color: Colors.textMarine,
    },

  });