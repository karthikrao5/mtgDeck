import React from 'react';
import {Button, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import * as DeckLoader from "../DeckLoader";
import {connect} from "react-redux";
import {SearchBar} from "../SearchBar";
import {database} from "../data/MTGDatabase";
import type {Card} from "../store/DeckTypes";

class AddDeckPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {results: [], dbReady: false};
  }

  componentDidMount() {
    database.open().then(() => {
      this.setState({dbReady: true});
    });
  }

  onTextChange = async (text: string) => {
    if (text === "") {
      this.setState({results: []});
    } else {
      const cards = await database.getCardsByString(text);
      this.setState({results: cards});
    }
  };

  renderSuggestions = () => {
    return this.state.results.map((item, index) => {
      return (
        <TouchableOpacity style={styles.suggestionRow} key={index}>
          <Text>{item.name}</Text>
        </TouchableOpacity>);
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <SearchBar onChangeText={this.onTextChange}/>
        <ScrollView keyboardDismissMode="on-drag">
          {this.renderSuggestions()}
        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  suggestionRow: {
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: 'red',
    borderWidth: 1
  }
});

export default connect()(AddDeckPage);