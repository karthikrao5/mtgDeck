// @flow
import React from "react";
import {Button, ScrollView, StyleSheet, View} from 'react-native';
import {connect} from "react-redux";
import type {Card} from "./store/DeckTypes";
import {addDeck} from "./store/DecksReducer";
import * as DeckLoader from "./DeckLoader";
import {makeGetDeckWithImages} from "./selectors";
import CardPreview from "./CardPreview";
import {persistor} from "./store/store";

type DeckListPageProps = {
  deck: Array<Card>,
  addDeck: () => void
}

class DeckViewPage extends React.Component<DeckListPageProps> {

  componentDidMount() {
    if (!this.props.deck.length > 0) {
      this.props.addDeck(DeckLoader.getJaceDeck());
    }
  }

  renderCards = () => {
    console.log("inside render cards method");
    if (this.props.deck.length > 0) {
      console.log(this.props.deck.length);
      return this.props.deck.map((card: Card, ind: number) => {
        return <CardPreview card={card}
                            index={ind}
                            key={ind}
                            navigation={this.props.navigation} />
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={() => {
          persistor.purge().then(() => {
            console.log("purged");
          })
        }} title={"Purge"}/>
        <ScrollView contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
          {this.renderCards()}
        </ScrollView>
      </View>
    );
  }
}

const makeMapStateToProps = () => {
  const getDeckWithImages = makeGetDeckWithImages();
  return (state) => {
    return {
      deck: getDeckWithImages(state)
    }
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addDeck: (deck: Array<Card>) => {
      dispatch(addDeck(deck))
    }
  }
};

export default connect(makeMapStateToProps, mapDispatchToProps)(DeckViewPage)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30
  }
});