// @flow
import React from "react";
import {Image, ScrollView, StyleSheet, View, TouchableOpacity} from 'react-native';
import {connect} from "react-redux";
import type {Card} from "./store/DeckTypes";
import {addDeck} from "./store/DecksReducer";
import * as DeckLoader from "./DeckLoader";
import {viewportHeight, wp} from "./ViewUtils";


const CardPreview = ({card, navigation, index}: { card: Card, navigation: any }) => {
  return (
    <View style={styles.cardPreviewContainer}>
      <TouchableOpacity style={{flex: 1}} onPress={() => {
        console.log(`${card.name} clicked with index: ${index}`);
        navigation.navigate('Carousel', {index});
      }}>
        <Image style={styles.image}
               source={{uri: `https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=${card.multiverseId}&type=card`}}/>
      </TouchableOpacity>
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
      return <CardPreview card={card} index={ind} key={ind} navigation={this.props.navigation}/>
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
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  }
});