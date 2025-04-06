import { atom, computed, map } from "nanostores";
import type { Card } from "./types";
import { getFlipped } from "./cardStore.util";

export interface CardStore {
  deck: Record<string, Card>;
  order: string[];
}

const initialState: CardStore = {
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
