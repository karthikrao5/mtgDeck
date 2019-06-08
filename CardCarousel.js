import Carousel from 'react-native-snap-carousel';
import React from "react";
import {Dimensions, Image, Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import * as DeckLoader from "./DeckLoader";
import {connect} from "react-redux";
import type {Card} from "./store/DeckTypes";
import {addDeck} from "./store/DecksReducer";

const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideHeight = viewportHeight * 0.50;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(1);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

type Props = {
  deck: Array<Card>
}

class CardCarousel extends React.Component<Props> {

  componentDidMount() {
    this.props.addDeck(DeckLoader.getJaceDeck());
  }

  static renderItem({item, index}: {item: Card, index: number}) {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.slideInnerContainer}
        onPress={() => { alert(`You've clicked '${item.name}'`); }}
      >
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{uri: `https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=${item.multiverseId}&type=card`}} />
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Carousel
          ref={(c) => {
            this._carousel = c;
          }}
          data={this.props.deck}
          renderItem={CardCarousel.renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          sliderHeight={slideHeight}
        />
      </View>
    )
  }
}
const mapStateToProps = (state) => {
  return {deck: state.decks.length ? state.decks[0] : []}
};

const mapDispatchToProps = dispatch => {
  return {
    addDeck: (deck: Array<Card>) => dispatch(addDeck(deck))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CardCarousel)

export const colors = {
  black: '#1a1917',
  gray: '#888888',
  background1: '#B721FF',
  background2: '#21D4FD'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    paddingTop: 30,
    borderColor: 'red',
    borderWidth: 1
  },
  slideInnerContainer: {
    width: itemWidth,
    height: slideHeight,
    paddingHorizontal: itemHorizontalMargin,
    paddingBottom: 18 // needed for shadow
  },
  imageContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius,
    borderWidth: 2,
    borderColor: 'red'
  },
  image: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
    borderRadius: IS_IOS ? entryBorderRadius : 0,
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius,
    borderWidth: 2,
    borderColor: 'green'
  }
});