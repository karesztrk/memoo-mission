import Deck from "../Deck";
import Card from "../Card";
import type { Card as CardType } from "@/store/gameSlice";
import { memo, useCallback, type FC } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { flipCard } from "@/store/cardSlice";
import { useAppSelector } from "@/hooks/useAppSelector";

interface BoardDeckProps {
  deck?: CardType[];
}

const BoardDeck: FC<BoardDeckProps> = ({ deck = [] }) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.game.status);

  const onCardClick = useCallback(
    (cardid: number) => () => {
      if (status === "playing") {
        dispatch(flipCard(cardid));
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
