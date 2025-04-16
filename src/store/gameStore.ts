import { atom, computed, onStart } from "nanostores";
import { matchedPairs } from "./cardStore";
import type { GameStatus } from "./types";
import { persistentAtom } from "@nanostores/persistent";

const DEFAULT_PAIRS = 6;
const DEFAULT_TIME = 60;
const MATCH_SCORE = 100;
const MISTAKE_SCORE = 10;

interface Settings {
  numberOfPairs: number;
  countdownTime: number;
  allowedMoves?: number;
}

export interface GameStore extends Settings {
  timeRemaining: number;
  elapsedTime: number;
  status: GameStatus;
  moves: number;
  matches: number;
  won: boolean;
}

const defaultSettings: Settings = {
  countdownTime: DEFAULT_TIME,
  numberOfPairs: DEFAULT_PAIRS,
};

const initialState: GameStore = {
  ...defaultSettings,
  elapsedTime: 0,
  timeRemaining: DEFAULT_TIME,
  status: "idle",
  moves: 0,
  matches: 0,
  won: false,
};

export const countdownTimeAtom = persistentAtom<number>(
  "countdownTime",
  initialState.countdownTime,

  {
    encode: JSON.stringify,
    decode: JSON.parse,
  },
);
export const timeRemainingAtom = atom(initialState.timeRemaining);
export const elapsedTimeAtom = atom(initialState.elapsedTime);
export const numberOfPairsAtom = persistentAtom(
  "numberOfPairs",
  initialState.numberOfPairs,
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  },
);
export const allowedMovesAtom = persistentAtom(
  "allowedMoves",
  initialState.allowedMoves,
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  },
);
export const statusAtom = atom(initialState.status);
export const movesAtom = atom(initialState.moves);
export const matchesAtom = atom(initialState.matches);
export const selectWon = computed(
  [matchedPairs, numberOfPairsAtom],
  (current, goal) => current === goal,
);
export const selectMistakes = computed(
  [movesAtom, matchesAtom],
  (moves, matches) => moves - matches,
);
export const selectScore = computed(
  [movesAtom, matchesAtom],
  (moves, matches) => {
    return (
      MATCH_SCORE + matches * MATCH_SCORE - (moves - matches) * MISTAKE_SCORE
    );
  },
);
