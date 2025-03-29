import { type FC, type PropsWithChildren } from "react";
import "./Card.css";

interface CardProps {
  flipped?: boolean;
  matched?: boolean;
  onClick?: () => void;
}

const Card: FC<PropsWithChildren<CardProps>> = ({ flipped = false, matched = false, onClick, children }) => {
  return (
    <div onClick={onClick} className={`card ${flipped ? "flipped" : ""} ${matched ? "matched" : ""}`}>
      <div className="card-inner">{flipped && children}</div>
    </div>
  );
};

export default Card;
