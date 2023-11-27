import React from 'react';
import { ScrollView, Image, View, Text, StyleSheet } from 'react-native';
import { TanksColors } from '../Colors';
import { BackButton } from '../Components/BackButton';
import { ParamChart } from '../Components/ParamChart';
import { Dimensions } from 'react-native';
import { PlusComponent } from '../Components/ItemComponent';
import { RemindersContent } from '../RemindersContent';

const screenWidth = Dimensions.get('window').width;
const chartWidth = screenWidth * 0.75; // 80% of screen width


export const TankScreen = ({ navigation, route, item }) => {
  const { tankId } = route.params;

  return (
  <View style={styles.body}>
    <BackButton navigation={navigation}/>
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={{ uri: 'https://i.imgur.com/0y8FkZC.jpg'}}
          style={{
            width: '100%',
            height: 175,
            resizeMode: 'cover',
            backgroundColor: 'blue',
          }}
        />
        <Text style={styles.title}>Param Chart: </Text>
        <ParamChart/>
        <Text style={styles.title}>Reminders: </Text>
        <RemindersContent navigation={navigation}></RemindersContent>

        
      </ScrollView>
    </View>
    
  </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: TanksColors.backgroundTanks,
    height: '100%',
    width: '100%',
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: TanksColors.backgroundTanks,
    width: '100%',
    paddingTop: Platform.OS === 'android' ? 60 : 0,
  },
  container: {
    width: '100%',
    height: '100%',
    paddingTop: 50,
    //alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: "100%",
  },
  title: {
    fontSize: 30,
    width: '90%',
    color: TanksColors.text,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 30,
  },
});