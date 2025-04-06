import emojis from "@/assets/emojis.json";
import { countFlipped, createBoardDeck, getFlipped } from "./cardStore.util";
import { deckAtom, flippedCards, orderAtom } from "./cardStore";

export const flipCard = (cardId: string) => {
  const deck = deckAtom.get();
  if (countFlipped(deck) > 1) {
    return;
  }

  const card = deckAtom.get()[cardId];
  const valid = card && !card.matched && card.flipped === false;
  if (valid) {
    deckAtom.setKey(cardId, {
      ...card,
      flipped: true,
    });
  }
};

export const resetFlippedCards = (cardIds: readonly string[]) => {
  for (const key of cardIds) {
    const card = deckAtom.get()[key];
    if (!card.matched) {
      deckAtom.setKey(key, {
        ...card,
        flipped: false,
      });
    }
  }
};

export const prepareDeck = (payload: { numberOfPairs: number }) => {
  const { numberOfPairs } = payload;
  const deck = emojis;
  const result = createBoardDeck(numberOfPairs, deck);
  deckAtom.set(result.deck);
  orderAtom.set(result.order);
};

export const restart = () => {
  const deck = deckAtom.get();
  Object.values(deck).forEach((card) => {
    card.flipped = false;
  });
  deckAtom.set(deck);
};

export const checkMatches = () => {
  const deck = deckAtom.get();
  const flippedCards = getFlipped(deck);
  if (flippedCards.length === 2) {
    const [firstCard, secondCard] = flippedCards;

    if (!firstCard || !secondCard) {
      return;
    }

    // Check if the cards match
    const match = firstCard.value === secondCard.value;
    if (match) {
      deckAtom.setKey(firstCard.id, {
        ...firstCard,
        matched: true,
      });
      deckAtom.setKey(secondCard.id, {
        ...secondCard,
        matched: true,
      });
    }
  }
};

flippedCards.subscribe((flipped) => {
  if (flipped.length >= 2) {
    checkMatches();

    setTimeout(() => {
      resetFlippedCards(flipped);
    }, 1000);
  }
});
