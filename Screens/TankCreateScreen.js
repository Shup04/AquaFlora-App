import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TankColors } from '../Colors';
import { BackButton } from '../Components/BackButton';

export const TankCreateScreen = ({navigation}) => {

  const handleSaveData = async () => {
    const realm = await Realm.open({ schema: [MySchema] });
    realm.write(() => {
      const newObject = realm.create('MySchema', {
        tankDesc,
        tankName,
        tankSize,
      });
    });
    realm.close();
  };

  return (
  <View style={styles.body}>
    <BackButton
          onPress={() => handleTabChange('Fish')}
          title="Fish"
          color="#4287f5"
          style={styles.headerButton}
          textStyle={{
            fontSize: 20,
            color: TankColors.text,
            fontWeight: 'bold',
          }}
        />
  </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: TankColors.backgroundColor,
    height: '100%',
    width: '100%',

    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: TankColors.backgroundColor,
    alignItems: 'center',
    width: '100%',
    paddingTop: Platform.OS === 'android' ? 60 : 0,
  },
});