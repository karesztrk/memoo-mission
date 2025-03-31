import { createSelector, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { makeMove, restart, start, type Card } from "./gameSlice";

const EMOJIS = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐸", "🐙", "🦄"];

export interface CardState {
  deck: Card[];
}

const initialState: CardState = {
  deck: [],
};

const createDeck = (length: number): Card[] => {
  const cards = Array.from({ length }, (_, i) => ({
    value: EMOJIS[i],
  }));

  const deck = [...cards, ...cards].map((card, index) => ({
    ...card,
    id: index,
    flipped: false,
    matched: false,
  }));

  // Shuffle the deck
  return deck.sort(() => Math.random() - 0.5);
};

const getFlipped = (deck: Card[]): number[] =>
  deck.filter((card) => card.flipped && !card.matched).map((card) => card.id);

const countFlipped = (deck: Card[]): number => getFlipped(deck).length;

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    flipCard: (state, action: PayloadAction<number>) => {
      const cardId = action.payload;
      if (countFlipped(state.deck) > 1) {
        return;
      }

      const card = state.deck.find((card) => card.id === cardId);
      const valid = card && !card.matched && card.flipped === false;
      if (valid) {
        card.flipped = true;
      }
    },

    resetFlippedCards: (state) => {
      state.deck
        .filter((card) => !card.matched)
        .forEach((card) => {
          card.flipped = false;
        });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(start, (state, action) => {
        const { numberOfPairs } = action.payload;

        state.deck = createDeck(numberOfPairs);
      })
      .addCase(restart, (state) => {
        state.deck.forEach((card) => {
          card.flipped = false;
        });
      })
      .addCase(makeMove, (state) => {
        const flippedCards = getFlipped(state.deck);
        if (flippedCards.length === 2) {
          const [firstId, secondId] = flippedCards;
          const firstCard = state.deck.find((card) => card.id === firstId);
          const secondCard = state.deck.find((card) => card.id === secondId);

          if (!firstCard || !secondCard) {
            return;
          }

          // Check if the cards match
          const match = firstCard.value === secondCard.value;
          if (match) {
            firstCard.matched = true;
            secondCard.matched = true;
          }
        }
      });
  },
  selectors: {
    matchedPairs: createSelector(
      (sliceState: CardState) => sliceState.deck,
      (value) => value.filter((card) => card.matched).reduce((acc) => (acc += 1), 0) / 2,
    ),
    flippedCards: createSelector(
      (sliceState: CardState) => sliceState.deck,
      (value) => getFlipped(value),
    ),
  },
});

export const { matchedPairs, flippedCards } = cardSlice.selectors;

export const { flipCard, resetFlippedCards } = cardSlice.actions;

export default cardSlice.reducer;
