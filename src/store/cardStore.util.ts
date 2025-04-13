import type { Card } from "./types";

export const createBoardDeck = (
  length: number,
  deck: string[],
): { deck: Record<string, Card>; order: string[] } => {
  const cards = Array.from({ length }, (_, i) => ({
    value: deck[i],
  }));

  const pairs = [...cards, ...cards].map((card, i) => ({
    ...card,
    // TODO: needs better id algorithm
    id: i.toString(),
    flipped: false,
    matched: false,
  }));
  pairs.sort(() => Math.random() - 0.5);
  // Shuffle the deck and return as object
  return {
    order: pairs.map((card) => card.id.toString()),
    deck: Object.fromEntries(pairs.map((card) => [card.id, card])),
  };
};

export const getFlipped = (deck: Record<string, Card>): Card[] =>
  Object.values(deck).filter((card) => card.flipped && !card.matched);

export const countFlipped = (deck: Record<string, Card>): number =>
  getFlipped(deck).length;
