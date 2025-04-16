import { useEffect, type FC } from "react";
import "./Game.css";
import Board from "../Board";
import { start } from "@/store/gameStore.action";
import { prepareDeck } from "@/store/cardStore.action";
import {
  allowedMovesAtom,
  countdownTimeAtom,
  numberOfPairsAtom,
} from "@/store/gameStore";

const Game: FC = () => {
  useEffect(() => {
    const numberOfPairs = numberOfPairsAtom.get();
    const countdownTime = countdownTimeAtom.get();
    const allowedMoves = allowedMovesAtom.get();
    start({
      numberOfPairs,
      countdownTime,
      allowedMoves,
    });
    prepareDeck({
      numberOfPairs,
    });
  }, []);
  return <Board />;
};

export default Game;
