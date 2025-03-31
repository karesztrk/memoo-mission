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

export interface Move {
  allMatched: boolean;
  match: boolean;
}

export type GameStatus = "idle" | "playing" | "gameover";

export interface GameState {
  cards: Card[];
  timeRemaining: number;
  elapsedTime: number;
  numberOfPairs: number;
  status: GameStatus;
  moves: number;
  matches: number;
}

const initialState: GameState = {
  cards: [],
  numberOfPairs: MIN_PAIRS,
  timeRemaining: MIN_TIME,
  elapsedTime: 0,
  status: "idle",
  moves: 0,
  matches: 0,
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
      state.moves = 0;
      state.matches = 0;
    },

    makeMove: (state, action: PayloadAction<Move>) => {
      const { allMatched, match } = action.payload;
      if (allMatched) {
        state.status = "gameover";
      }

      state.moves += 1;

      if (match) {
        state.matches += 1;
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
      state.moves = 0;
      state.matches = 0;
    },
  },

  selectors: {
    selectMistakes: (state: GameState) => state.moves - state.matches,
  },
});

export const { selectMistakes } = gameSlice.selectors;

export const { start, tick, restart, makeMove } = gameSlice.actions;

export default gameSlice.reducer;
