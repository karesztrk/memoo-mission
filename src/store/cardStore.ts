import { atom, computed, map, onMount, task } from "nanostores";
import type { Card } from "./gameStore";
import emojis from "@/assets/emojis.json";

export interface CardState {
  deck: Record<string, Card>;
  order: string[];
}

const initialState: CardState = {
  deck: {},
  order: [],
};

const createBoardDeck = (
  length: number,
  deck: string[],
): { deck: Record<string, Card>; order: string[] } => {
  const cards = Array.from({ length }, (_, i) => ({
    value: deck[i],
  }));

  const pairs = [...cards, ...cards].map((card, i) => ({
    ...card,
    id: i.toString(),
    flipped: false,
    matched: false,
  }));
  pairs.sort(() => Math.random() - 0.5);
  // Shuffle the deck and reutrn as object
  return {
    order: pairs.map((card) => card.id.toString()),
    deck: Object.fromEntries(pairs.map((card) => [card.id, card])),
  };
};

const getFlipped = (deck: Record<string, Card>): string[] => {
  return Object.values(deck)
    .filter((card) => card.flipped && !card.matched)
    .map((card) => card.id);
};

const countFlipped = (deck: Record<string, Card>): number =>
  getFlipped(deck).length;

export const deckAtom = map(initialState.deck);
export const orderAtom = atom(initialState.order);

export const flipCard = (cardId: string) => {
  const deck = deckAtom.get();
  if (countFlipped(deck) > 1) {
    return;
  }

  const card = deckAtom.get()[cardId];
  const valid = card && !card.matched && card.flipped === false;
  if (valid) {
    deckAtom.setKey(cardId, {
      ...card,
      flipped: true,
    });
  }
};

export const resetFlippedCards = () => {
  const deck = deckAtom.get();
  for (const [key, value] of Object.entries(deck)) {
    if (!value.matched) {
      deckAtom.setKey(key, {
        ...value,
        flipped: false,
      });
    }
  }
};

export const start = (payload: { numberOfPairs: number }) => {
  const { numberOfPairs } = payload;
  const deck = emojis;
  const result = createBoardDeck(numberOfPairs, deck);
  deckAtom.set(result.deck);
  orderAtom.set(result.order);
};

export const updateCardSettings = (payload: { numberOfPairs: number }) => {
  const { numberOfPairs } = payload;
  const deck = emojis;
  const result = createBoardDeck(numberOfPairs, deck);
  deckAtom.set(result.deck);
  orderAtom.set(result.order);
};

export const restart = () => {
  const deck = deckAtom.get();
  Object.values(deck).forEach((card) => {
    card.flipped = false;
  });
  deckAtom.set(deck);
};

export const makeMove = () => {
  const deck = deckAtom.get();
  const flippedCards = getFlipped(deck);
  if (flippedCards.length === 2) {
    const [firstId, secondId] = flippedCards;
    const firstCard = deckAtom.get()[firstId];
    const secondCard = deckAtom.get()[secondId];

    if (!firstCard || !secondCard) {
      return;
    }

    // Check if the cards match
    const match = firstCard.value === secondCard.value;
    if (match) {
      deckAtom.setKey(firstId, {
        ...firstCard,
        matched: true,
      });
      deckAtom.setKey(secondId, {
        ...secondCard,
        matched: true,
      });
    }
  }
};

export const matchedPairs = computed(deckAtom, (deck) => {
  return (
    Object.values(deck)
      .filter((card) => card.matched)
      .reduce((acc) => acc + 1, 0) / 2
  );
});

export const flippedCards = computed(deckAtom, (deck) => {
  return getFlipped(deck);
});
