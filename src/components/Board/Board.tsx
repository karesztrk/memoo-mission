import { useCallback, useEffect, type FC } from "react";
import "./Board.css";
import { tick, makeMove } from "@/store/gameSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import {
  flippedCards,
  matchedPairs,
  resetFlippedCards,
} from "@/store/cardSlice";
import Welcome from "../Welcome";
import BoardDeck from "./BoardDeck";

interface BoardProps {
  deck?: string[];
}

const Board: FC<BoardProps> = ({ deck }) => {
  const dispatch = useAppDispatch();
  const gameState = useAppSelector((state) => state.game);
  const cardState = useAppSelector((state) => state.card);
  const status = useAppSelector((state) => state.game.status);

  const matches = matchedPairs({ card: cardState });
  const flipped = flippedCards({ card: cardState });

  const getStatus = () => {
    const [firstId, secondId] = flipped;
    const first = cardState.deck.find((card) => card.id === firstId);
    const second = cardState.deck.find((card) => card.id === secondId);

    const match = first?.value === second?.value;

    const allMatched = cardState.deck.every(
      (card) => card.matched || flipped.includes(card.id),
    );
    return {
      match,
      allMatched,
    };
  };

  /**
   * Turn the cards back eventually.
   */
  useEffect(() => {
    if (flipped.length === 2 && status === "playing") {
      const { allMatched, match } = getStatus();

      dispatch(makeMove({ allMatched, match }));

      setTimeout(() => {
        dispatch(resetFlippedCards());
      }, 1000);
    }
  }, [flipped, dispatch]);

  /**
   * Countdown.
   */
  useEffect(() => {
    if (status !== "playing") {
      return;
    }

    const timer = setInterval(() => {
      dispatch(tick());
    }, 1000);

    return () => clearInterval(timer);
  }, [status, dispatch]);

  if (status === "idle") {
    return (
      <div className="container">
        <article>
          <Welcome deck={deck} />
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
              {matches === gameState.numberOfPairs
                ? "🎉 Congratulations! You won! 🎉"
                : "👾🕹️ Game Over! 🎮💀"}
            </h2>
          </div>
        )}

        <BoardDeck deck={cardState.deck} />
      </div>
    </div>
  );
};

export default Board;
