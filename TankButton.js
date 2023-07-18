import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from './Colors';

const ButtonComponent = ({ onPress, title, style, textStyle }) => {

  const handlePress = () => {
    const realm = new Realm({ schema: [PersonSchema] });
    const allPeople = realm.objects('Person');

    realm.write(() => {
      realm.create('Person', { name: 'John', age: 25 });
    });
    console.log(allPeople);
    console.log('Button pressed')
    
  };

  return (
    <TouchableOpacity 
      style={style} 
      onPress={handlePress}
      >

      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent;