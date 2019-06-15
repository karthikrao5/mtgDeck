import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import * as DeckLoader from "../DeckLoader";
import {ButtonWrapper} from "../ButtonWrapper";
import {connect} from "react-redux";
import type {Deck} from "../store/DeckTypes";
import {addDeck} from "../store/DecksReducer";

class DeckListPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      deckList: []
    }
  }

  componentDidMount() {
    this.setState({deckList: DeckLoader.getAllDeckFileNames()})
  }

  _deckPressed = (event, id) => {
    console.log(`onpress clicked with id ${id}`);
    // DeckLoader.getDeckById(id);
  };

  renderDeckButtons = () => {
    return this.state.deckList.map((item, ind) => {
      return <ButtonWrapper key={ind}
                     title={item.deckName}
                     onPress={this._deckPressed} id={item.fileName}/>
    })
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text>DeckListPage</Text>
          {this.renderDeckButtons()}
        </ScrollView>
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addDeck: (deck: Deck) => {
      dispatch(addDeck(deck))
    }
  }
};

export default connect(null, mapDispatchToProps)(DeckListPage)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30
  }
});