import { atom, computed } from "nanostores";
import { matchedPairs } from "./cardStore";
import type { GameStatus } from "./types";

const DEFAULT_PAIRS = 6;
const DEFAULT_TIME = 60;
const MATCH_SCORE = 100;
const MISTAKE_SCORE = 10;

export interface GameStore {
  countdownTime: number;
  timeRemaining: number;
  elapsedTime: number;
  numberOfPairs: number;
  allowedMoves?: number;
  status: GameStatus;
  moves: number;
  matches: number;
  won: boolean;
}

const initialState: GameStore = {
  countdownTime: DEFAULT_TIME,
  numberOfPairs: DEFAULT_PAIRS,
  timeRemaining: DEFAULT_TIME,
  elapsedTime: 0,
  status: "idle",
  moves: 0,
  matches: 0,
  won: false,
};

export const countdownTimeAtom = atom(initialState.countdownTime);
export const timeRemainingAtom = atom(initialState.timeRemaining);
export const elapsedTimeAtom = atom(initialState.elapsedTime);
export const numberOfPairsAtom = atom(initialState.numberOfPairs);
export const allowedMovesAtom = atom(initialState.allowedMoves);
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
