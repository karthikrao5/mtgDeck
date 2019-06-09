import type {Card} from "./store/DeckTypes";
import {StyleSheet, Text, Image, TouchableOpacity, View} from "react-native";
import React from "react";
import {connect} from "react-redux";
import {viewportHeight, wp} from "./ViewUtils";
import {loadImage} from "./store/ImagesReducer";
import {makeGetCardToDisplay} from "./selectors";

type Props = {
  card: Card,
  imageUrl: string,
  navigation: any,
  fetchImage: any
}

const CardPreview = (props: Props) => {
  const {card, navigation, imageUrl, index} = props;
  if (!imageUrl) {
    props.fetchImage(card.multiverseId);
  }
  return (
    <View style={styles.cardPreviewContainer}>
      <TouchableOpacity style={{flex: 1}} onPress={() => {
        console.log(`${card.name} clicked with index: ${index}`);
        navigation.navigate('Carousel', {index});
      }}>
        {/*<Text>{imageUrl}</Text>*/}
        <Image style={styles.image}
          source={{uri: imageUrl}}/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardPreviewContainer: {
    // borderWidth: 1,
    // borderColor: 'red',
    width: wp(30),
    height: viewportHeight * 0.2
  },
  image: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  }
});

const makeMapStateToProps = () => {
  const getCardToDisplay = makeGetCardToDisplay();
  return (state, props) => {
    return {
      imageUrl: getCardToDisplay(state, props)
    }
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchImage: (id: number) => {
      // console.log("fetching...................");
      dispatch(loadImage(id))
    }
  }
};

export default connect(makeMapStateToProps, mapDispatchToProps)(CardPreview);