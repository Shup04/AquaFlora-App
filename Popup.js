import React, { useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import Modal from 'react-native-modal';
import Realm from 'realm';

// Define your Realm schema
const MySchema = {
  name: 'MySchema',
  properties: {
    id: 'int',
    input1: 'string',
    input2: 'string',
    // Add more properties as needed
  },
};

const Popup = ({ isModalVisible, setModalVisible }) => {
  const [tankName, setTankName] = useState('');
  const [tankSize, setTankSize] = useState('');
  const [tankDesc, setTankDesc] = useState('');

  // Function to handle the submission of data to the Realm database
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

    // Reset input values and close the modal
    setTankName('');
    setTankSize('');
    setTankDesc('');

  };

  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={() => {}}
      onBackButtonPress={() => {}}
    >
      <View>
        <TextInput
          placeholder="Enter Tank Name"
          value={tankName}
          onChangeText={(text) => setTankName(text)}
        />

        <TextInput
          placeholder="Enter Tank Size"
          value={tankSize}
          onChangeText={(text) => setTankSize(text)}
        />

        <TextInput
          placeholder="Enter Tank Description"
          value={tankDesc}
          onChangeText={(text) => setTankDesc(text)}
        />

        <Button title="Save" onPress={handleSaveData} />
        <Button title="Cancel" onPress={() => setModalVisible(false)} />
      </View>
    </Modal>
  );
};

export default Popup;
