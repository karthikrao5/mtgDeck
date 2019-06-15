import React from 'react';
import {View, Text, Button} from 'react-native';

export const HomePage = (props) => {
  return (
    <View>
      <Text>Hello</Text>
      <Button title="Deck Builder" onPress={() => {
        props.navigation.navigate('AddDeckPage');

      }}/>
    </View>
  )
};