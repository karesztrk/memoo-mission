import { type FC, type PropsWithChildren } from "react";
import "./Deck.css";
import { LayoutGroup } from "motion/react";

const Deck: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="deck">
      <LayoutGroup>{children}</LayoutGroup>
    </div>
  );
};

export default Deck;
