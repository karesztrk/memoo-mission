import type { FC } from "react";
import "./Board.css";
import { matchedPairs } from "@/store/cardStore";
import { numberOfPairsAtom, statusAtom } from "@/store/gameStore";
import { useStore } from "@nanostores/react";
import Welcome from "../Welcome";
import BoardDeck from "./BoardDeck";

const Board: FC = () => {
  const status = useStore(statusAtom);
  const numberOfPairs = useStore(numberOfPairsAtom);

  const matches = matchedPairs.get();

  if (status === "idle") {
    return (
      <div className="container">
        <article>
          <Welcome />
        </article>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="game-board">
        {status === "gameover" && (
          <div className="game-over">
            <h2>
              {matches === numberOfPairs
                ? "🎉 Congratulations! You won! 🎉"
                : "👾🕹️ Game Over! 🎮💀"}
            </h2>
          </div>
        )}

        <BoardDeck />
      </div>
    </div>
  );
};

export default Board;
