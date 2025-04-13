export interface GameSettings {
  countdownTime: number;
  numberOfPairs: number;
  allowedMoves?: number;
}

export type GameStart = GameSettings;

export interface Card {
  id: string;
  value: string;
  flipped: boolean;
  matched: boolean;
}

export interface Move {
  match: boolean;
}

export type GameStatus = "idle" | "playing" | "gameover";
