import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const DEFAULT_PAIRS = 6;
const DEFAULT_TIME = 60;
const MATCH_SCORE = 100;
const MISTAKE_SCORE = 10;

export interface GameSettings {
  countdownTime: number;
  numberOfPairs: number;
  allowedMoves?: number;
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
  allowedMoves?: number;
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

const statusMachine: Record<GameStatus, Record<string, GameStatus>> = {
  idle: {
    start: "playing",
  },
  playing: {
    allMatched: "gameover",
    outOfMoves: "gameover",
    timeout: "gameover",
    restart: "idle",
  },
  gameover: {
    restart: "idle",
  },
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    start: (state, action: PayloadAction<GameStart>) => {
      const { countdownTime, numberOfPairs, allowedMoves } = action.payload;
      state.status = statusMachine[state.status].start;
      state.countdownTime = countdownTime;
      state.timeRemaining = countdownTime;
      state.numberOfPairs = numberOfPairs;
      state.allowedMoves = allowedMoves;
      state.elapsedTime = 0;
      state.moves = 0;
      state.matches = 0;
    },

    updateSettings: (state, action: PayloadAction<GameSettings>) => {
      const { countdownTime, numberOfPairs, allowedMoves } = action.payload;
      state.countdownTime = countdownTime;
      state.timeRemaining = countdownTime;
      state.numberOfPairs = numberOfPairs;
      state.allowedMoves = allowedMoves;
    },

    makeMove: (state, action: PayloadAction<Move>) => {
      const { allMatched, match } = action.payload;
      if (allMatched) {
        state.status = statusMachine[state.status].allMatched;
      }

      state.moves += 1;

      if (
        state.allowedMoves !== undefined &&
        !match &&
        state.moves >= state.allowedMoves
      ) {
        state.status = statusMachine[state.status].outOfMoves;
      }

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
        state.status = statusMachine[state.status].timeout;
      }
    },

    restart: (state) => {
      state.status = statusMachine[state.status].restart;
      state.timeRemaining = state.countdownTime;
      state.elapsedTime = 0;
      state.moves = 0;
      state.matches = 0;
    },
  },

  selectors: {
    selectMistakes: (state: GameState) => state.moves - state.matches,
    selectScore: (state: GameState) =>
      MATCH_SCORE +
      state.matches * MATCH_SCORE -
      (state.moves - state.matches) * MISTAKE_SCORE,
  },
});

export const { selectMistakes, selectScore } = gameSlice.selectors;

export const { start, updateSettings, tick, restart, makeMove } =
  gameSlice.actions;

export default gameSlice.reducer;
