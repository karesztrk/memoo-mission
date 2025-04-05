import type { FC } from "react";
import "./Game.css";
import Board from "../Board";

interface GameProps {
  deck?: string[];
}

const Game: FC<GameProps> = ({ deck = [] }) => {
  return <Board deck={deck} />;
};

export default Game;
