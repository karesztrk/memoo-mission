import { useEffect, type FC } from "react";
import "./Board.css";
import {
  tick,
  makeMove,
  statusAtom,
  numberOfPairsAtom,
} from "@/store/gameStore";
import {
  deckAtom,
  flippedCards,
  matchedPairs,
  resetFlippedCards,
} from "@/store/cardStore";
import Welcome from "../Welcome";
import BoardDeck from "./BoardDeck";
import { useStore } from "@nanostores/react";

interface BoardProps {
  deck?: string[];
}

const Board: FC<BoardProps> = ({ deck: deckProp }) => {
  const deck = useStore(deckAtom);
  const status = useStore(statusAtom);
  const numberOfPairs = useStore(numberOfPairsAtom);

  const matches = matchedPairs.get();
  const flipped = flippedCards.get();

  const getStatus = () => {
    const [firstId, secondId] = flipped;
    const first = deck.find((card) => card.id === firstId);
    const second = deck.find((card) => card.id === secondId);

    const match = first?.value === second?.value;

    const allMatched = deck.every(
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

      makeMove({ allMatched, match });

      setTimeout(() => {
        resetFlippedCards();
      }, 1000);
    }
  }, [flipped]);

  /**
   * Countdown.
   */
  useEffect(() => {
    if (status !== "playing") {
      return;
    }

    const timer = setInterval(() => {
      tick();
    }, 1000);

    return () => clearInterval(timer);
  }, [status]);

  if (status === "idle") {
    return (
      <div className="container">
        <article>
          <Welcome deck={deckProp} />
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

        <BoardDeck deck={deck} />
      </div>
    </div>
  );
};

export default Board;
