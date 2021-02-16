import React, {useState, useEffect} from 'react';
import Geolocation from '@react-native-community/geolocation';

import {View, Text} from 'react-native';

const HomeScreen = () => {
  const [position, setPosition] = useState(null);
  useEffect(() => {
    Geolocation.getCurrentPosition((info) => setPosition(info));
  }, []);
  console.log(position);
  return (
    <View>
      <Text>Home Screen</Text>
      {position && (
        <Text>
          Current Position : Latitude - {position.coords.latitude}, longitude -{' '}
          {position.coords.longitude}
        </Text>
      )}
    </View>
  );
};

export default HomeScreen;
