import { useMemo, type FC, type PropsWithChildren } from "react";
import "./Deck.css";
import { greatestDivisor } from "./Deck.util";

interface DeckProps {
  size?: number;
}

const Deck: FC<PropsWithChildren<DeckProps>> = ({ size = 16, children }) => {
  const columns = useMemo(() => greatestDivisor(size), [size]);
  return (
    <div
      className="deck"
      style={{ "--columns": columns }}
      aria-label="Game deck"
    >
      {children}
    </div>
  );
};

export default Deck;
