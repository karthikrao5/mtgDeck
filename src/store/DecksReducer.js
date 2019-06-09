import type {Card} from "./DeckTypes";
import {getImageUrl} from "../DeckLoader";
// import { PURGE, REHYDRATE } from 'redux-persist';

export const ADD_DECK = 'ADD_DECK';


export const addDeck = (deck: Array<Card>) => {
  return {
    type: ADD_DECK,
    deck
  }
};

type State = {
  deck: Array<Card>,
}

const INITIAL_STATE: State = {
  deck: []
};


export const decksReducer = (state: State = INITIAL_STATE, action): State => {
  switch (action.type) {
    case ADD_DECK:
      return {...state, deck: action.deck};
    default:
      return state
  }
};