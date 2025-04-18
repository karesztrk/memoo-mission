import {
  memo,
  useEffect,
  useRef,
  useState,
  type FC,
  type PropsWithChildren,
} from "react";
import "./Card.css";
import { animate } from "./Card.util";
import useReducedMotion from "@/hooks/useReducedMotion";
import Magic from "./Magic";

interface CardProps {
  id?: string;
  order?: number;
  flipped?: boolean;
  matched?: boolean;
  onClick?: () => void;
}

const dev = import.meta.env.DEV;

const Card: FC<PropsWithChildren<CardProps>> = ({
  id = "",
  order = 0,
  flipped = false,
  matched = false,
  onClick,
  children,
}) => {
  const reduceMotion = useReducedMotion();
  const [ready, setReady] = useState(false);
  const starRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!document.startViewTransition || reduceMotion) {
      setReady(true);
      return;
    }

    const ms = order * 150;
    const timeout = setTimeout(() => {
      // transition
      document.startViewTransition(() => {
        setReady(true);
      });
    }, ms);
    return () => {
      clearTimeout(timeout);
    };
  }, [reduceMotion]);

  useEffect(() => {
    const star = starRef.current;
    let index = 0;
    const interval = 1000;

    if (matched && star && !reduceMotion) {
      setTimeout(
        () => {
          animate(star);

          setInterval(() => animate(star), 1000);
        },
        index++ * (interval / 3),
      );
    }
  }, [matched, reduceMotion]);
  return (
    <button
      onClick={onClick}
      className={`card ${flipped ? "flipped" : ""} ${matched ? "matched" : ""} ${ready ? "ready" : ""}`}
      aria-pressed={flipped}
      aria-label={`${flipped ? "Flipped" : "Unflipped"} card`}
      {...(dev && {
        "data-testid": children,
      })}
      style={{
        "--transition-name": `card-${id}`,
      }}
      tabIndex={matched ? -1 : 0}
    >
      {matched && <Magic ref={starRef} />}
      <div className="face front">{flipped && children}</div>
      <div className="face back">
        {!flipped && (
          <svg
            className="back-image"
            width="90"
            height="140"
            viewBox="0 0 90 140"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Card back</title>
            <path
              className="cover"
              d="M32.0405 5.89313C7.01358 7.74412 3.65842 35.509 4.02528 60.9602C4.95913 125.745 4.02528 135 48.3828 135C84.8026 135 85.7364 110.937 84.8026 100.757C83.4018 66.0505 84.8026 74.38 84.8026 40.5993C84.8026 2.97691 63.3242 3.57938 32.0405 5.89313Z"
            />
            <path
              className="question-mark"
              d="M38.392 75.68C38.392 67.936 47.992 65.248 47.992 60.384C47.992 58.528 46.712 57.312 44.216 57.312C41.336 57.312 39.416 59.296 38.072 62.368L28.344 56.8C31.288 49.696 37.688 46.24 44.664 46.24C52.472 46.24 59.384 50.848 59.384 58.976C59.384 68.576 49.272 71.264 49.272 75.68H38.392Z"
            />
            <path
              className="question-mark"
              d="M43.832 92.896C40.12 92.896 37.176 89.952 37.176 86.24C37.176 82.592 40.12 79.584 43.832 79.584C47.544 79.584 50.488 82.592 50.488 86.24C50.488 89.952 47.544 92.896 43.832 92.896Z"
            />
          </svg>
        )}
      </div>
    </button>
  );
};

export default memo(
  Card,
  (left, right) =>
    left.id === right.id &&
    left.order === right.order &&
    left.flipped === right.flipped &&
    left.matched === right.matched,
);
