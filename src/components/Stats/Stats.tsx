import { useEffect, useState, type FC } from "react";
import "./Stats.css";
import { getStore, subscribeToStore } from "@/store/store";
import { selectMistakes, selectScore, type GameStatus } from "@/store/gameSlice";
import { formatTime } from "./Stats.util";

const Stat: FC = () => {
  const [timeRemaining, setTimeRemaining] = useState(getStore().getState().game.timeRemaining);
  const [matches, setMatches] = useState(getStore().getState().game.matches);
  const [mistakes, setMistakes] = useState(getStore().getState().game.moves);
  const [score, setScore] = useState(selectScore(getStore().getState()));
  const [status, setStatus] = useState<GameStatus>(getStore().getState().game.status);
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
