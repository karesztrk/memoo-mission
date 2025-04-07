import Deck from "../Deck";
import Card from "../Card";
import { statusAtom } from "@/store/gameStore";
import { memo, useCallback, type FC } from "react";
import { orderedDek } from "@/store/cardStore";
import { useStore } from "@nanostores/react";
import { flipCard } from "@/store/cardStore.action";

const BoardDeck: FC = () => {
  const status = statusAtom.get();
  const deck = useStore(orderedDek);

  const onCardClick = useCallback(
    (cardid: string) => () => {
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

export default memo(BoardDeck);
