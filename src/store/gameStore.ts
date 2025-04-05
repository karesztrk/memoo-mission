import { atom, computed } from "nanostores";

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
  id: string;
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
  (matches, moves) => {
    return (
      MATCH_SCORE + matches * MATCH_SCORE - (moves - matches) * MISTAKE_SCORE
    );
  },
);
