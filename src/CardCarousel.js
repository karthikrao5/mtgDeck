import Carousel from 'react-native-snap-carousel';
import React from "react";
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {connect} from "react-redux";
import type {Card} from "./store/DeckTypes";
import GestureRecognizer from "react-native-swipe-gestures";
import {IS_IOS, viewportHeight, viewportWidth, wp} from "./ViewUtils";
import {getDeck, makeGetCardToDisplay, makeGetDeckWithImages} from "./selectors";


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
  onSwipeDown = () => {
    console.log("swiped down");
    this.props.navigation.navigate('DeckView');
  };

  static renderItem({item, index}: { item: Card, index: number }) {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.slideInnerContainer}
        onPress={() => {
          alert(`You've clicked '${item.name}'`);
        }}
      >
        <View style={styles.imageContainer}>
          <Image style={styles.image}
                 source={{uri: item.imageUrl}}
          />
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <GestureRecognizer
        onSwipeDown={this.onSwipeDown}
      >
        <View style={styles.container}>
          <Carousel
            ref={(c) => {
              this._carousel = c;
            }}
            data={this.props.deck}
            firstItem={this.props.navigation.getParam('index')}
            renderItem={CardCarousel.renderItem}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            sliderHeight={slideHeight}
          />
        </View>
      </GestureRecognizer>
    )
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
export default connect(makeMapStateToProps)(CardCarousel)

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
    // borderColor: 'red',
    // borderWidth: 1
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
    // borderWidth: 2,
    // borderColor: 'red'
  },
  image: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
    borderRadius: IS_IOS ? entryBorderRadius : 0,
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius,
    // borderWidth: 2,
    // borderColor: 'green'
  }
});