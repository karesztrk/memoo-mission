import { useEffect, type FC } from "react";
import "./Board.css";
import { tick, restart, makeMove, selectMistakes } from "@/store/gameSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import Settings from "@/components/Settings";
import Deck from "../Deck";
import Card from "../Card";
import { flipCard, flippedCards, matchedPairs, resetFlippedCards } from "@/store/cardSlice";
import Welcome from "../Welcome";

interface BoardProps {
  deck?: string[];
}

const Board: FC<BoardProps> = ({ deck }) => {
  const dispatch = useAppDispatch();
  const gameState = useAppSelector((state) => state.game);
  const cardState = useAppSelector((state) => state.card);
  const username = useAppSelector((state) => state.user.userName);
  const status = useAppSelector((state) => state.game.status);

  const matches = matchedPairs({ card: cardState });
  const flipped = flippedCards({ card: cardState });
  const mistakes = selectMistakes({ game: gameState });

  const onPlayAgain = () => {
    dispatch(restart());
  };

  const onCardClick = (cardId: number) => () => {
    if (status === "playing") {
      dispatch(flipCard(cardId));
    }
  };

  const getStatus = () => {
    const [firstId, secondId] = flipped;
    const first = cardState.deck.find((card) => card.id === firstId);
    const second = cardState.deck.find((card) => card.id === secondId);

    const match = first?.value === second?.value;

    const allMatched = cardState.deck.every((card) => card.matched || flipped.includes(card.id));
    return {
      match,
      allMatched,
    };
  };

  useEffect(() => {
    if (flipped.length === 2 && status === "playing") {
      const { allMatched, match } = getStatus();

      dispatch(makeMove({ allMatched, match }));

      setTimeout(() => {
        dispatch(resetFlippedCards());
      }, 1000);
    }
  }, [flipped, dispatch]);

  useEffect(() => {
    if (status !== "playing") {
      return;
    }

    const timer = setInterval(() => {
      dispatch(tick());
    }, 1000);

    return () => clearInterval(timer);
  }, [status, dispatch]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  if (status === "idle") {
    return (
      <div className="container">
        <Welcome deck={deck} />
      </div>
    );
  }

  return (
    <div className="container">
      <div className="game-container">
        <div className="game-board">
          <div className="stats-row">
            <div className="stat-item">
              <span className="stat-text">Player: {username}</span>
            </div>
          </div>
          <div className="stats-row">
            <div className="stat-item">
              <span className="stat-text">Time: {formatTime(gameState.timeRemaining)}</span>
            </div>
            <div className="stat-item">
              <span className="stat-text">
                Matches: {matches} / {gameState.numberOfPairs}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-text">Mistakes: {mistakes}</span>
            </div>
          </div>

          {status === "gameover" && (
            <div className="game-over">
              <h2>
                {matches === gameState.numberOfPairs ? "🎉 Congratulations! You won! 🎉" : "⏰ Time's up! Game Over ⏰"}
              </h2>
              <button onClick={onPlayAgain} className="button">
                Play Again
              </button>
            </div>
          )}

          <Deck>
            {cardState.deck.map((card) => (
              <Card key={card.id} flipped={card.flipped} matched={card.matched} onClick={onCardClick(card.id)}>
                {card.value}
              </Card>
            ))}
          </Deck>
        </div>
      </div>
    </div>
  );
};

export default Board;
