import { atom, computed } from "nanostores";
import { allMatched, deckAtom, flippedCards, matchedPairs } from "./cardStore";
import type { GameSettings, GameStart, GameStatus, Move } from "./types";

const DEFAULT_PAIRS = 6;
const DEFAULT_TIME = 60;
const MATCH_SCORE = 100;
const MISTAKE_SCORE = 10;

export interface GameState {
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

const initialState: GameState = {
  countdownTime: DEFAULT_TIME,
  numberOfPairs: DEFAULT_PAIRS,
  timeRemaining: DEFAULT_TIME,
  elapsedTime: 0,
  status: "idle",
  moves: 0,
  matches: 0,
  won: false,
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
  (moves, matches) => {
    return (
      MATCH_SCORE + matches * MATCH_SCORE - (moves - matches) * MISTAKE_SCORE
    );
  },
);

export const start = (payload: GameStart) => {
  const { countdownTime, numberOfPairs, allowedMoves } = payload;
  statusAtom.set(statusMachine[statusAtom.get()].start);
  countdownTimeAtom.set(countdownTime);
  timeRemainingAtom.set(countdownTime);
  numberOfPairsAtom.set(numberOfPairs);
  allowedMovesAtom.set(allowedMoves);
  elapsedTimeAtom.set(0);
  movesAtom.set(0);
  matchesAtom.set(0);
};

export const updateSettings = (payload: GameSettings) => {
  const { countdownTime, numberOfPairs, allowedMoves } = payload;
  countdownTimeAtom.set(countdownTime);
  timeRemainingAtom.set(countdownTime);
  numberOfPairsAtom.set(numberOfPairs);
  allowedMovesAtom.set(allowedMoves);
};

export const makeMove = (payload: Move) => {
  const { match } = payload;

  movesAtom.set(movesAtom.get() + 1);

  const allowedMoves = allowedMovesAtom.get();
  if (allowedMoves !== undefined && !match && movesAtom.get() >= allowedMoves) {
    statusAtom.set(statusMachine[statusAtom.get()].outOfMoves);
  }

  if (match) {
    matchesAtom.set(matchesAtom.get() + 1);
  }
};

export const tick = () => {
  const timeRemaining = timeRemainingAtom.get();
  const elapsedTime = elapsedTimeAtom.get();
  if (timeRemaining > 0) {
    timeRemainingAtom.set(timeRemaining - 1);
    elapsedTimeAtom.set(elapsedTime + 1);
  }
  if (timeRemaining === 0) {
    statusAtom.set(statusMachine[statusAtom.get()].timeout);
  }
};

export const restart = () => {
  statusAtom.set(statusMachine[statusAtom.get()].restart);
  timeRemainingAtom.set(countdownTimeAtom.get());
  elapsedTimeAtom.set(0);
  movesAtom.set(0);
  matchesAtom.set(0);
};

const getMatchStatus = (flipped: readonly string[]) => {
  const [firstId, secondId] = flipped;
  const first = deckAtom.get()[firstId];
  const second = deckAtom.get()[secondId];

  return first?.value === second?.value;
};

allMatched.subscribe((allMatched) => {
  if (allMatched) {
    statusAtom.set(statusMachine[statusAtom.get()].allMatched);
  }
});

flippedCards.subscribe((flipped) => {
  if (flipped.length === 2) {
    const match = getMatchStatus(flipped);

    makeMove({ match });
  }
});
