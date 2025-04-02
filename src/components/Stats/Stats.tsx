import { useEffect, useState, type FC } from "react";
import "./Stats.css";
import { subscribeToStore } from "@/store/store";
import { selectMistakes, selectScore, type GameStatus } from "@/store/gameSlice";
import { formatTime } from "./Stats.util";

const Stat: FC = () => {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [matches, setMatches] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState<GameStatus>("idle");
  const playing = status === "playing" || status === "gameover";

  /**
   * Subscribe to store changes.
   */
  useEffect(() => {
    const unsubscribe = subscribeToStore(
      (state) => state.game,
      (state) => {
        setTimeRemaining(state.timeRemaining);
        setMatches(state.matches);

        const mistakes = selectMistakes({ game: state });
        setMistakes(mistakes);

        setStatus(state.status);

        const score = selectScore({ game: state });
        setScore(score);
      },
    );

    return () => {
      unsubscribe();
    };
  }, []);

  if (!playing) {
    return <></>;
  }

  return (
    <ul className="stats">
      <li className="stat">
        <>
          <div className="time">{formatTime(timeRemaining)}</div>
          <div className="matches stat-item">{matches} matches</div>
          <div className="mistakes stat-item">{mistakes} mistakes</div>
          <div className="score stat-item">{score} score</div>
        </>
      </li>
    </ul>
  );
};

export default Stat;
