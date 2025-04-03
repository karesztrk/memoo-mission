import { useEffect, useState, type FC } from "react";
import "./Stats.css";
import { getStore, subscribeToStore } from "@/store/store";
import { selectMistakes, selectScore } from "@/store/gameSlice";
import { formatTime } from "./Stats.util";

const Stats: FC = () => {
  const [state, setState] = useState(getStore().getState().game);
  const { moves, timeRemaining, status, allowedMoves } = state;
  const playing = status === "playing" || status === "gameover";

  const [matches, setMatches] = useState(getStore().getState().game.matches);
  const [mistakes, setMistakes] = useState(selectMistakes(getStore().getState()));
  const [score, setScore] = useState(selectScore(getStore().getState()));

  /**
   * Subscribe to store changes.
   */
  useEffect(() => {
    const unsubscribe = subscribeToStore(
      (state) => state.game,
      (state) => {
        setState(state);
        setMatches(state.matches);

        const mistakes = selectMistakes({ game: state });
        setMistakes(mistakes);

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
          {allowedMoves && (
            <div className="score stat-item">
              {moves}/{allowedMoves} guess
            </div>
          )}
        </>
      </li>
    </ul>
  );
};

export default Stats;
