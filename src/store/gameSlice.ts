import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const MIN_PAIRS = 6;
const MIN_TIME = 60;

export interface GameSettings {
  countdownTime: number;
  numberOfPairs: number;
  username: string;
  deck: string[];
}

export interface Card {
  id: number;
  value: string;
  flipped: boolean;
  matched: boolean;
}

export type GameStatus = "idle" | "playing" | "gameover";

export interface GameState {
  cards: Card[];
  timeRemaining: number;
  elapsedTime: number;
  countdownTime: number;
  numberOfPairs: number;
  status: GameStatus;
}

const initialState: GameState = {
  cards: [],
  numberOfPairs: MIN_PAIRS,
  countdownTime: MIN_TIME,
  timeRemaining: 60,
  elapsedTime: 0,
  status: "idle",
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    start: (state, action: PayloadAction<GameSettings>) => {
      const { countdownTime, numberOfPairs } = action.payload;
      state.timeRemaining = countdownTime;
      state.numberOfPairs = numberOfPairs;
      state.elapsedTime = 0;
      state.status = "playing";
    },

    makeMove: (state, action: PayloadAction<{ allMatched: boolean }>) => {
      const { allMatched } = action.payload;
      if (allMatched) {
        state.status = "gameover";
      }
    },

    tick: (state) => {
      if (state.timeRemaining > 0) {
        state.timeRemaining -= 1;
        state.elapsedTime += 1;
      }
      if (state.timeRemaining === 0) {
        state.status = "gameover";
      }
    },

    restart: (state) => {
      state.status = "idle";
      state.elapsedTime = 0;
    },
  },
});

export const { start, tick, restart, makeMove } = gameSlice.actions;

export default gameSlice.reducer;
