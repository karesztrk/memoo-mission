import type { FC } from "react";
import "./Stats.css";
import {
  allowedMovesAtom,
  matchesAtom,
  movesAtom,
  selectMistakes,
  selectScore,
  statusAtom,
  timeRemainingAtom,
} from "@/store/gameStore";
import { formatTime } from "./Stats.util";
import { useStore } from "@nanostores/react";

const Stats: FC = () => {
  const status = useStore(statusAtom);
  const moves = useStore(movesAtom);
  const matches = useStore(matchesAtom);
  const timeRemaining = useStore(timeRemainingAtom);
  const allowedMoves = useStore(allowedMovesAtom);
  const playing = status === "playing" || status === "gameover";

  const score = selectScore.get();
  const mistakes = selectMistakes.get();

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
