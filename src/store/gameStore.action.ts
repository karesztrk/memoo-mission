import { allMatched, deckAtom, flippedCards } from "./cardStore";
import {
  allowedMovesAtom,
  countdownTimeAtom,
  elapsedTimeAtom,
  matchesAtom,
  movesAtom,
  numberOfPairsAtom,
  statusAtom,
  timeRemainingAtom,
} from "./gameStore";
import type { GameSettings, GameStart, GameStatus, Move } from "./types";

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

let timer: NodeJS.Timeout | undefined;
statusAtom.subscribe((status) => {
  if (status !== "playing") {
    if (timer) {
      clearInterval(timer);
      timer = undefined;
    }
    return;
  }

  timer = setInterval(() => {
    tick();
  }, 1000);
});

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
