import { useState, type FC, type PropsWithChildren } from "react";
import Card from "@/components/Card";
import "./Deck.css";

interface Card {
  value: string;
  flipped: boolean;
}

const mock = [
  { value: "🍎", flipped: false },
  { value: "🍌", flipped: false },
  { value: "🍉", flipped: false },
  { value: "🍓", flipped: false },
];

const Deck: FC<PropsWithChildren> = () => {
  const [cards, setCards] = useState<Card[]>(mock);
  const onClick = (index: number) => () => {
    setCards((cards) => cards.map((c, i) => (i === index ? { ...c, flipped: !c.flipped } : c)));
  };
  return (
    <div className="deck">
      {cards.map((card, i) => (
        <Card key={i} onClick={onClick(i)} flipped={card.flipped}>
          {card.value}
        </Card>
      ))}
    </div>
  );
};

export default Deck;
