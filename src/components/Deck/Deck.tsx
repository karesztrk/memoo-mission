import { type FC, type PropsWithChildren } from "react";
import "./Deck.css";

interface DeckProps {
  size?: number;
}

const Deck: FC<PropsWithChildren<DeckProps>> = ({ size = 16, children }) => {
  return (
    <div className="deck" aria-label="Game deck">
      {children}
    </div>
  );
};

export default Deck;
