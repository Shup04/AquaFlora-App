import React from 'react';
import { TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const ProfilePictureButton = () => {
  const showList = (id) => {
    // Handle onPress event
    console.log('Clicked profile picture with id:', id);
  };

  return (
    <TouchableOpacity onPress={() => showList(1)}>
      <Svg
        width={60}
        height={60}
        style={{
          marginLeft: 20,
          backgroundColor: 'blue',
        }}
        viewBox="0 0 100 100"
      >
        {/* Example 1: Circle */}
        <Path d="M50 10 A40 40 0 1 1 50 90 A40 40 0 1 1 50 10" fill="red" />
      </Svg>
    </TouchableOpacity>
  );
};

export default ProfilePictureButton;