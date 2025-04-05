import Deck from "../Deck";
import Card from "../Card";
import { statusAtom, type Card as CardType } from "@/store/gameStore";
import { memo, useCallback, type FC } from "react";
import { flipCard } from "@/store/cardStore";
import { useStore } from "@nanostores/react";

interface BoardDeckProps {
  deck?: CardType[];
}

const BoardDeck: FC<BoardDeckProps> = ({ deck = [] }) => {
  const status = useStore(statusAtom);

  const onCardClick = useCallback(
    (cardid: number) => () => {
      if (status === "playing") {
        flipCard(cardid);
      }
    },
    [status],
  );

  return (
    <Deck size={deck.length}>
      {deck.map((card, i) => (
        <Card
          id={card.id.toString()}
          order={i}
          key={card.id}
          flipped={card.flipped}
          matched={card.matched}
          onClick={onCardClick(card.id)}
        >
          {card.value}
        </Card>
      ))}
    </Deck>
  );
};

export default memo(BoardDeck, (left, right) => left.deck === right.deck);
