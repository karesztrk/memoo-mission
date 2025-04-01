import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const DEFAULT_PAIRS = 6;
const DEFAULT_TIME = 60;

export interface GameSettings {
  countdownTime: number;
  numberOfPairs: number;
  deck: string[];
}

export interface GameStart extends GameSettings {
  username: string;
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
  countdownTime: number;
  timeRemaining: number;
  elapsedTime: number;
  numberOfPairs: number;
  status: GameStatus;
  moves: number;
  matches: number;
}

const initialState: GameState = {
  cards: [],
  countdownTime: DEFAULT_TIME,
  numberOfPairs: DEFAULT_PAIRS,
  timeRemaining: DEFAULT_TIME,
  elapsedTime: 0,
  status: "idle",
  moves: 0,
  matches: 0,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    start: (state, action: PayloadAction<GameStart>) => {
      const { countdownTime, numberOfPairs } = action.payload;
      state.status = "playing";
      state.countdownTime = countdownTime;
      state.timeRemaining = countdownTime;
      state.numberOfPairs = numberOfPairs;
      state.elapsedTime = 0;
      state.moves = 0;
      state.matches = 0;
    },

    updateSettings: (state, action: PayloadAction<GameSettings>) => {
      const { countdownTime, numberOfPairs } = action.payload;
      state.countdownTime = countdownTime;
      state.timeRemaining = countdownTime;
      state.numberOfPairs = numberOfPairs;
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
      state.timeRemaining = state.countdownTime;
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

export const { start, updateSettings, tick, restart, makeMove } = gameSlice.actions;

export default gameSlice.reducer;
