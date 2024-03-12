import React from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from '../Colors';

export const ParentStyles = StyleSheet.create({
    Background: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.backgroundDark
    },
    Container: {
      width: '100%',
      height: '100%',
      paddingVertical: 30,
    },
    Header: {
      fontSize: 24,
      color: Colors.textWhite,
      fontWeight: 'semibold',
    },

  });