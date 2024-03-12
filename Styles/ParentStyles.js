import React from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from '../Colors';

export const ParentStyles = StyleSheet.create({
    Background: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.backgroundDark
    },
    Header: {
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        color: Colors.textMarine,
    },

  });