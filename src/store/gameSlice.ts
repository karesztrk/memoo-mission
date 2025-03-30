import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const EMOJIS = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐸", "🐙", "🦄"];

export interface GameSettings {
  numberOfPairs: number;
  countdownTime: number;
}

export interface Card {
  id: number;
  value: string;
  flipped: boolean;
  matched: boolean;
}

export interface GameState {
  cards: Card[];
  flippedCards: number[];
  matchedPairs: number;
  gameOver: boolean;
  timeRemaining: number;
  userName: string;
  score: number;
  elapsedTime: number;
}

const initialState: GameState = {
  cards: [],
  flippedCards: [],
  matchedPairs: 0,
  gameOver: false,
  timeRemaining: 60,
  userName: "",
  score: 0,
  elapsedTime: 0,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },

    init: (state, action: PayloadAction<GameSettings>) => {
      const selectedEmojis = EMOJIS.slice(0, action.payload.numberOfPairs);
      const cardPairs = [...selectedEmojis, ...selectedEmojis];
      const shuffledCards: Card[] = cardPairs
        .sort(() => Math.random() - 0.5)
        .map((value, index) => ({
          id: index,
          value,
          flipped: false,
          matched: false,
        }));

      state.cards = shuffledCards;
      state.flippedCards = [];
      state.matchedPairs = 0;
      state.gameOver = false;
      state.timeRemaining = action.payload.countdownTime;
      state.score = 0;
      state.elapsedTime = 0;
    },

    flipCard: (state, action: PayloadAction<number>) => {
      const cardId = action.payload;

      if (
        state.flippedCards.length === 2 ||
        state.cards[cardId].flipped ||
        state.cards[cardId].matched ||
        state.gameOver
      ) {
        return;
      }

      state.cards[cardId].flipped = true;
      state.flippedCards.push(cardId);
    },

    checkMatch: (state) => {
      if (state.flippedCards.length !== 2) return;

      const [firstCard, secondCard] = state.flippedCards;
      if (state.cards[firstCard].value === state.cards[secondCard].value) {
        state.cards[firstCard].matched = true;
        state.cards[secondCard].matched = true;
        state.matchedPairs += 1;
        state.score += 100; // Add points for successful match
        state.flippedCards = [];
        state.gameOver = state.matchedPairs === Math.floor(state.cards.length / 2);
      }
    },

    resetFlippedCards: (state) => {
      state.flippedCards.forEach((cardId) => {
        state.cards[cardId].flipped = false;
      });
      state.flippedCards = [];
      state.score = Math.max(0, state.score - 10); // Subtract points for failed match
    },

    decrementTimer: (state) => {
      if (state.timeRemaining > 0) {
        state.timeRemaining -= 1;
        state.elapsedTime += 1;
      }
      if (state.timeRemaining === 0) {
        state.gameOver = true;
      }
    },
  },
});

export const { init, flipCard, checkMatch, resetFlippedCards, decrementTimer, setUserName } = gameSlice.actions;

export default gameSlice.reducer;
