import { atom, computed, map } from "nanostores";
import type { Card } from "./types";
import emojis from "@/assets/emojis.json";
import { countFlipped, createBoardDeck, getFlipped } from "./cardStore.util";

export interface CardState {
  deck: Record<string, Card>;
  order: string[];
}

const initialState: CardState = {
  deck: {},
  order: [],
};

export const deckAtom = map(initialState.deck);
export const orderAtom = atom(initialState.order);
export const matchedPairs = computed(deckAtom, (deck) => {
  return (
    Object.values(deck)
      .filter((card) => card.matched)
      .reduce((acc) => acc + 1, 0) / 2
  );
});
export const flippedCards = computed(deckAtom, (deck) =>
  getFlipped(deck).map((card) => card.id),
);
export const allMatched = computed(deckAtom, (deck) => {
  if (Object.keys(deck).length === 0) {
    return false;
  }
  return Object.values(deck).every((card) => card.matched);
});

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

export const resetFlippedCards = (cardIds: readonly string[]) => {
  for (const key of cardIds) {
    const card = deckAtom.get()[key];
    if (!card.matched) {
      deckAtom.setKey(key, {
        ...card,
        flipped: false,
      });
    }
  }
};

export const prepareDeck = (payload: { numberOfPairs: number }) => {
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

export const checkMatches = () => {
  const deck = deckAtom.get();
  const flippedCards = getFlipped(deck);
  if (flippedCards.length === 2) {
    const [firstCard, secondCard] = flippedCards;

    if (!firstCard || !secondCard) {
      return;
    }

    // Check if the cards match
    const match = firstCard.value === secondCard.value;
    if (match) {
      deckAtom.setKey(firstCard.id, {
        ...firstCard,
        matched: true,
      });
      deckAtom.setKey(secondCard.id, {
        ...secondCard,
        matched: true,
      });
    }
  }
};

flippedCards.subscribe((flipped) => {
  if (flipped.length >= 2) {
    checkMatches();

    setTimeout(() => {
      resetFlippedCards(flipped);
    }, 1000);
  }
});
