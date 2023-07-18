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
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');

  // Function to handle the submission of data to the Realm database
  const handleSaveData = async () => {
    const realm = await Realm.open({ schema: [MySchema] });
    realm.write(() => {
      const newObject = realm.create('MySchema', {
        id: new Date().getTime(),
        input1,
        input2,
      });
    });
    realm.close();

    // Reset input values and close the modal
    setInput1('');
    setInput2('');
    setModalVisible(false);
  };

  return (
    <View>
      <Modal isVisible={isModalVisible}>
        <View>
          <TextInput
            placeholder="Input 1"
            value={input1}
            onChangeText={text => setInput1(text)}
          />

          <TextInput
            placeholder="Input 2"
            value={input2}
            onChangeText={text => setInput2(text)}
          />

          <Button title="Save" onPress={handleSaveData} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

export default Popup;
