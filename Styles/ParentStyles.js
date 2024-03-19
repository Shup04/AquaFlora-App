import React from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from '../Colors';
import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from '@expo-google-fonts/inter';


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
      paddingTop: 60,
    },
    Header: {
      fontSize: 24,
      margin: 10,
      marginTop: 20,
      color: Colors.textMarine,
      fontFamily: 'Inter_500Medium',
    },
    SubHeader: {
      fontSize: 18,
      margin: 10,
      marginTop: 20,
      color: Colors.textMarine,
      fontFamily: 'Inter_400Regular',
    },

  });