import { type FC, type PropsWithChildren } from "react";
import "./Deck.css";

const Deck: FC<PropsWithChildren> = ({ children }) => {
  return <div className="deck">{children}</div>;
};

export default Deck;
