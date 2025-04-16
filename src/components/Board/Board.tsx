import type { FC } from "react";
import "./Board.css";
import { statusAtom, selectWon } from "@/store/gameStore";
import { useStore } from "@nanostores/react";
import BoardDeck from "./BoardDeck";

const Board: FC = () => {
  const status = useStore(statusAtom);
  const won = selectWon.get();

  return (
    <div className="container">
      <div className="game-board">
        {status === "gameover" && (
          <div className="game-over">
            <h2>
              {won ? "🎉 Congratulations! You won! 🎉" : "👾🕹️ Game Over! 🎮💀"}
            </h2>
          </div>
        )}

        <BoardDeck />
      </div>
    </div>
  );
};

export default Board;
