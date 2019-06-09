// @flow
import {createSelector} from 'reselect'
import type {Card} from "../store/DeckTypes";

const getDeckState = (state) => state.deck.deck;
const getImageUrls = (state) => state.images.imageUrls;

const getImageForCardState = (state, props) => {
  return state.images.imageUrls[props.card.multiverseId];
};

export const makeGetDeckWithImages = () => createSelector(
  [getDeckState, getImageUrls],
  (deck, imageUrls) => {
    return deck.map((item: Card) => {
      if (!item.imageUrl && imageUrls[item.multiverseId]) {
        item.imageUrl = imageUrls[item.multiverseId];
      }
      return item;
    })
  });

export const makeGetCardToDisplay = () => createSelector(
  [getImageForCardState], (imageUrl) => {
    if (!imageUrl) {
      // console.log("no image url found");
    } else {
      return imageUrl
    }
  });