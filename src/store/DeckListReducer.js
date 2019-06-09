import type {Deck} from "./DeckTypes";

type State = {
  deckList: {
    deckId: string,
    deck: Deck
  }
}

type Action = {
  deckId: string,
  deck: Deck
}

const INITIAL_STATE: State = {
  deckList: {}
};

export const ADD_DECK = 'ADD_DECK';

export const addDeck = (deck: Deck, deckId: string) => {
  return {
    type: ADD_DECK,
    data: {deck, deckId}
  }
};

export const deckListReducer = (state: State = INITIAL_STATE, action): State => {
  switch (action.type) {
    case ADD_DECK:
      return {...state, deckList: {...state.deckList, [action.deckId]: action.deck}};
    default:
      return state
  }
};