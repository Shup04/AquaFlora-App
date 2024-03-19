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
      color: Colors.textMarine,
      fontFamily: 'Inter_500Medium',
    },
    SubHeader: {
      fontSize: 18,
      color: Colors.textMarine,
      fontFamily: 'Inter_500Medium',
    },
    Title: {
      fontSize: 28,
      width: '90%',
      color: Colors.textWhite,
      marginTop: 20,
      fontFamily: 'Inter_500Medium',
    },
    SubTitle: {
      fontSize: 18,
      width: '90%',
      color: Colors.textWhite,
      fontFamily: 'Inter_400Regular',
    },
    Text: {
      fontSize: 14,
      width: '90%',
      color: Colors.textWhite,
      fontFamily: 'Inter_400Regular',
    },
  });

export const ButtonStyles = StyleSheet.create({
  Button: {
    height: 100,
    width: '95%',
    alignSelf: 'center',
    marginVertical: 10,
    backgroundColor: Colors.height2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: 8,
    shadowColor: '#000000',
    elevation: 5,
  },
  PlusButton: {
    height: 55,
    width: '95%',
    alignSelf: 'center',
    backgroundColor: Colors.height2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    shadowColor: '#000000',
    elevation: 5,
    marginVertical: 10,
  },

});