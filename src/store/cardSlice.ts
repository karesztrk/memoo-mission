import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { makeMove, restart, start, type Card } from "./gameSlice";

const EMOJIS = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐸", "🐙", "🦄"];

export interface UserState {
  deck: Card[];
  flippedCards: number[];
  matchedPairs: number;
}

const initialState: UserState = {
  deck: [],
  flippedCards: [],
  matchedPairs: 0,
};

const createDeck = (length: number): Card[] => {
  // Generate pairs of cards (numbers, images, etc.)
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

const cardSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    flipCard: (state, action: PayloadAction<number>) => {
      const cardId = action.payload;
      if (state.flippedCards.length > 1) {
        return;
      }

      const card = state.deck.find((card) => card.id === cardId);
      const valid = card && !card.matched && card.flipped === false;
      if (valid) {
        card.flipped = true;
        state.flippedCards = [...state.flippedCards, cardId];
      }
    },
    resetFlippedCards: (state) => {
      state.deck
        .filter((card) => !card.matched)
        .forEach((card) => {
          card.flipped = false;
        });
      state.flippedCards = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(start, (state, action) => {
        const { numberOfPairs } = action.payload;

        state.deck = createDeck(numberOfPairs);
        state.flippedCards = [];
        state.matchedPairs = 0;
      })
      .addCase(restart, (state) => {
        state.flippedCards = [];
        state.matchedPairs = 0;
      })
      .addCase(makeMove, (state) => {
        if (state.flippedCards.length === 2) {
          const [firstId, secondId] = state.flippedCards;
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
            state.matchedPairs += 1;
          }
        }
      });
  },
});

export const { flipCard, resetFlippedCards } = cardSlice.actions;

export default cardSlice.reducer;
