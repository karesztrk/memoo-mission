import { useEffect, useState, type FC } from "react";
import "./Board.css";
import { checkMatch, decrementTimer, flipCard, init, resetFlippedCards, type GameSettings } from "@/store/gameSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import Settings from "@/components/Settings";
import Deck from "../Deck";
import Card from "../Card";

const Board: FC = () => {
  const [settings, setSettings] = useState<GameSettings>({ numberOfPairs: 6, countdownTime: 60 });
  const [gameStarted, setGameStarted] = useState(false);
  const dispatch = useAppDispatch();
  const gameState = useAppSelector((state) => state.game);

  const handleStartGame = (newSettings: GameSettings) => {
    setSettings(newSettings);
    dispatch(init(newSettings));
    setGameStarted(true);
  };

  const handlePlayAgain = () => {
    setGameStarted(false);
  };

  const handleCardClick = (cardId: number) => () => {
    dispatch(flipCard(cardId));
  };

  useEffect(() => {
    if (gameState.flippedCards.length === 2) {
      dispatch(checkMatch());
      if (gameState.flippedCards.length === 2) {
        setTimeout(() => {
          dispatch(resetFlippedCards());
        }, 1000);
      }
    }
  }, [gameState.flippedCards, dispatch]);

  useEffect(() => {
    if (!gameStarted || gameState.gameOver) return;

    const timer = setInterval(() => {
      dispatch(decrementTimer());
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted, gameState.gameOver, dispatch]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  if (!gameStarted) {
    return (
      <div className="container">
        <Settings onSubmit={handleStartGame} />
      </div>
    );
  }

  return (
    <div className="container">
      <div className="game-container">
        <div className="game-board">
          <div className="stats-row">
            <div className="stat-item">
              <span className="stat-text">Player: {gameState.userName}</span>
            </div>
            <div className="stat-item">
              <span className="stat-text">Score: {gameState.score}</span>
            </div>
          </div>
          <div className="stats-row">
            <div className="stat-item">
              <span className="stat-text">Time: {formatTime(gameState.timeRemaining)}</span>
            </div>
            <div className="stat-item">
              <span className="stat-text">
                Matches: {gameState.matchedPairs} / {settings.numberOfPairs}
              </span>
            </div>
          </div>

          {gameState.gameOver && (
            <div className="game-over">
              <h2>
                {gameState.matchedPairs === settings.numberOfPairs
                  ? "🎉 Congratulations! You won! 🎉"
                  : "⏰ Time's up! Game Over ⏰"}
              </h2>
              <p>
                Final Score: {gameState.score} | Time Played: {formatTime(gameState.elapsedTime)}
              </p>
              <button onClick={handlePlayAgain} className="button">
                Play Again
              </button>
            </div>
          )}

          <Deck>
            {gameState.cards.map((card) => (
              <Card key={card.id} flipped={card.flipped} matched={card.matched} onClick={handleCardClick(card.id)}>
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
