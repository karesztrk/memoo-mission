import Deck from "../Deck";
import Card from "../Card";
import { statusAtom, type Card as CardType } from "@/store/gameStore";
import { memo, useCallback, type FC } from "react";
import { flipCard } from "@/store/cardStore";
import { useStore } from "@nanostores/react";

interface BoardDeckProps {
  deck?: Record<number, CardType>;
  order?: number[];
}

const BoardDeck: FC<BoardDeckProps> = ({ deck = {}, order = [] }) => {
  const status = useStore(statusAtom);

  const onCardClick = useCallback(
    (cardid: string) => () => {
      if (status === "playing") {
        flipCard(cardid);
      }
    },
    [status],
  );

  return (
    <Deck size={Object.keys(deck).length}>
      {order.map((i) => {
        const card = deck[i];
        return (
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
        );
      })}
    </Deck>
  );
};

export default memo(BoardDeck, (left, right) => left.deck === right.deck);
