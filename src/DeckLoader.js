// @flow

import * as Jace from './data/JaceArcaneStrategist.json';
import * as AllDeckList from './DeckLists.json';
import * as AllCardList from './DeckLists.json';
import type {Card} from "./store/DeckTypes";

export const getJaceDeck = (): Array<Card> => {
  return Jace.mainBoard.map((item: any) => {
    return {
      name: item.name,
      multiverseId: item.multiverseId
    }
  });
};


export const getAllDeckFileNames = () => {
  return AllDeckList.decks.map((item: {fileName: string, name: string, code: string}) => {
    return {fileName: item.fileName, deckName: item.name, code: item.code}
  })
};

export const getDeckById = (deckFileName: string) => {
  let file = `./data/${deckFileName}`;
  // const module = import(file).then((json) => {
  //   console.log(json);
  // })
};

export const cardSearchApi = async (query: string): Array<string> => {
  try {
    console.log(query);
    const response = await fetch(`https://api.scryfall.com/cards/autocomplete?q=${query}`);
    return response.json();

  } catch (error) {
    console.log(error);
  }
};

export const cardSearchLocal = (query: string): Array<string> => {

};