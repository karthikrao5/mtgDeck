// @flow

export type Card = {
  multiverseId: number,
  name: string
}

export type Deck = {
  cards: Array<Card>
}

export type DeckList = {
  decks: Array<Deck>
}