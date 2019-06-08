// @flow

import * as Jace from '../JaceArcaneStrategist.json';
import type {Card} from "./store/DeckTypes";


export const getJaceDeck = (): Array<Card> => {
  console.log(Jace);
  return Jace.mainBoard.map((item: any) => {
    return {name: item.name, multiverseId: item.multiverseId}
  });
};


