// @flow

import * as Jace from './data/JaceArcaneStrategist.json';
import * as AllDeckList from './DeckLists.json';
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
  const module = import(file).then((json) => {
    console.log(json);
  })
};