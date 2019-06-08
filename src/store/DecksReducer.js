import type {Card, Deck} from "./DeckTypes";

type State = {
  decks: Array<Deck>
}

export const ADD_DECK = 'ADD_DECK';

export const addDeck = (deck: Array<Card>) => {
  return {
    type: ADD_DECK,
    deck
  }
};


const INITIAL_STATE: {decks: Array<Card>} = {
  decks: []
};

export const decksReducer = (state: State = INITIAL_STATE, action): State => {
  switch (action.type) {
    case ADD_DECK:
      return {...state, decks: [...state.decks, action.deck]};
    default:
      return state
  }
};