import Deck from "../Deck";
import Card from "../Card";
import { statusAtom, type Card as CardType } from "@/store/gameStore";
import { memo, useCallback, useMemo, type FC } from "react";
import { deckAtom, flipCard, orderAtom } from "@/store/cardStore";
import { useStore } from "@nanostores/react";

const BoardDeck: FC = () => {
  const status = statusAtom.get();
  const order = orderAtom.get();
  const deck = useStore(deckAtom);

  const onCardClick = useCallback(
    (cardid: string) => () => {
      if (status === "playing") {
        flipCard(cardid);
      }
    },
    [status],
  );

  const cards = useMemo<CardType[]>(() => {
    if (order.length === 0) {
      return Object.values(deck);
    }
    const values: CardType[] = [];
    for (const id of order) {
      const card = deck[id];
      values.push(card);
    }
    return values;
  }, [deck, order]);

  return (
    <Deck size={Object.keys(deck).length}>
      {cards.map((card, i) => (
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
