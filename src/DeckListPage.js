// @flow
import React from "react";
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {connect} from "react-redux";
import type {Card} from "./store/DeckTypes";
import {addDeck} from "./store/DecksReducer";
import * as DeckLoader from "./DeckLoader";
import {viewportHeight, wp} from "./ViewUtils";


const CardPreview = ({card}: { card: Card }) => {
  return (
    <View style={styles.cardPreviewContainer}>
      <Image style={styles.image}
             source={{uri: `https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=${card.multiverseId}&type=card`}}/>
    </View>
  );
};

type DeckListPageProps = {
  deck: Array<Card>,
  addDeck: () => void
}

class DeckListPage extends React.Component<DeckListPageProps> {

  componentDidMount() {
    this.props.addDeck(DeckLoader.getJaceDeck());
  }

  renderCards = () => {
    return this.props.deck.map((card: Card, ind: number) => {
      return <CardPreview card={card} key={ind}/>
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
          {this.renderCards()}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state.decks);
  return {deck: state.decks.length ? state.decks[0] : []}
};

const mapDispatchToProps = dispatch => {
  return {
    addDeck: (deck: Array<Card>) => dispatch(addDeck(deck))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DeckListPage)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    borderWidth: 1,
    borderColor: 'green',
  },
  cardPreviewContainer: {
    borderWidth: 1,
    borderColor: 'red',
    width: wp(30),
    height: viewportHeight * 0.2
  },
  image: {
    // flex: 1,
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  }
});