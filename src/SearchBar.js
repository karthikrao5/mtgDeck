import React from 'react';
import {
  View, Text, TouchableOpacity,
  ScrollView, TextInput, StyleSheet
} from 'react-native';
import {viewportWidth} from "./ViewUtils";
import Icon from 'react-native-vector-icons/MaterialIcons';


export const SearchBar = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Icon style={styles.icon}
              name="search"
              color="#000"
              size={14}
        />
        <TextInput
          style={styles.input}
          onChangeText={props.onChangeText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'center',
    padding: 7,
    paddingRight: 7,
    width: viewportWidth,
    // borderColor: 'red',
    // borderWidth: 1
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },
  input: {
    flex: 1,
    fontSize: 22,
    // borderColor: 'blue',
    // borderWidth: 1,
  },
  icon: {
    // borderColor: 'green',
    // borderWidth: 1,
    alignSelf: 'center',
    fontSize: 30
  }
});