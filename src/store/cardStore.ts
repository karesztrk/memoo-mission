import { computed, map } from "nanostores";
import type { Card, GameSettings, GameStart } from "./gameStore";

export interface CardState {
  deck: Card[];
}

const initialState: CardState = {
  deck: [],
};

const createBoardDeck = (length: number, deck: string[]): Card[] => {
  const cards = Array.from({ length }, (_, i) => ({
    value: deck[i],
  }));

  const pairs = [...cards, ...cards].map((card, i) => ({
    ...card,
    id: i,
    flipped: false,
    matched: false,
  }));

  // Shuffle the deck
  return pairs.sort(() => Math.random() - 0.5);
};

const getFlipped = (deck: Card[]): number[] =>
  deck.filter((card) => card.flipped && !card.matched).map((card) => card.id);

const countFlipped = (deck: Card[]): number => getFlipped(deck).length;

export const deckAtom = map(initialState.deck);

export const flipCard = (payload: number) => {
  const deck = deckAtom.get();
  const cardId = payload;
  if (countFlipped(deck) > 1) {
    return;
  }

  const card = deck.find((card) => card.id === cardId);
  const valid = card && !card.matched && card.flipped === false;
  if (valid) {
    card.flipped = true;
  }
  deckAtom.set(deck);
};

export const resetFlippedCards = () => {
  const deck = deckAtom.get();
  deck
    .filter((card) => !card.matched)
    .forEach((card) => {
      card.flipped = false;
    });
  deckAtom.set(deck);
};

export const start = (payload: GameStart) => {
  const { numberOfPairs, deck } = payload;
  deckAtom.set(createBoardDeck(numberOfPairs, deck));
};

export const updateSettings = (payload: GameSettings) => {
  const { numberOfPairs, deck } = payload;

  deckAtom.set(createBoardDeck(numberOfPairs, deck));
};

export const restart = () => {
  const deck = deckAtom.get();
  deck.forEach((card) => {
    card.flipped = false;
  });
  deckAtom.set(deck);
};

export const makeMove = () => {
  const deck = deckAtom.get();
  const flippedCards = getFlipped(deck);
  if (flippedCards.length === 2) {
    const [firstId, secondId] = flippedCards;
    const firstCard = deck.find((card) => card.id === firstId);
    const secondCard = deck.find((card) => card.id === secondId);

    if (!firstCard || !secondCard) {
      return;
    }

    // Check if the cards match
    const match = firstCard.value === secondCard.value;
    if (match) {
      firstCard.matched = true;
      secondCard.matched = true;
    }
    deckAtom.set(deck);
  }
};

export const matchedPairs = computed(deckAtom, (deck) => {
  return deck.filter((card) => card.matched).reduce((acc) => acc + 1, 0) / 2;
});

export const flippedCards = computed(deckAtom, (deck) => {
  return getFlipped(deck);
});
