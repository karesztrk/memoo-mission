import { describe, expect, test } from "vitest";
import { screen, render } from "@testing-library/react";
import BoardDeck from "@/components/Board/BoardDeck";
import { deckAtom } from "@/store/cardStore";
import type { Card } from "@/store/gameStore";

describe("Board deck", () => {
  test("renders empty", async () => {
    render(<BoardDeck />);

    expect(screen.getByLabelText("Game deck")).toBeInTheDocument();
  });

  test("renders main playing elements", async () => {
    const deck: Record<string, Card> = {
      1: {
        id: "1",
        value: "🐶",
        flipped: false,
        matched: false,
      },
      2: {
        id: "2",
        value: "🐱",
        flipped: false,
        matched: false,
      },
      3: {
        id: "3",
        value: "🐭",
        flipped: false,
        matched: false,
      },
    };
    deckAtom.set(deck);
    const size = Object.keys(deck).length;

    render(<BoardDeck />);

    expect(screen.getByLabelText("Game deck")).toBeInTheDocument();
    expect(
      screen.getAllByRole("button", { name: "Unflipped card" }).length,
    ).toBe(size);

    for (const key in deck) {
      const card = deck[key];
      expect(screen.getByTestId(card.value)).toHaveTextContent("Card back");
    }
  });

  test("renders flipped cards elements", async () => {
    const deck: Record<string, Card> = {
      1: {
        id: "1",
        value: "🐶",
        flipped: true,
        matched: false,
      },
      2: {
        id: "2",
        value: "🐱",
        flipped: true,
        matched: false,
      },
      3: {
        id: "3",
        value: "🐭",
        flipped: false,
        matched: false,
      },
    };
    deckAtom.set(deck);

    const size = Object.keys(deck).length;
    const flipped = Object.values(deck)
      .filter((card) => card.flipped)
      .reduce((acc) => acc + 1, 0);

    render(<BoardDeck />);

    expect(screen.getByLabelText("Game deck")).toBeInTheDocument();
    expect(
      screen.getAllByRole("button", { name: "Unflipped card" }).length,
    ).toBe(size - flipped);

    for (const key in deck) {
      const card = deck[key];
      expect(screen.getByTestId(card.value)).toHaveTextContent(
        card.flipped ? card.value : "Card back",
      );
    }
  });
});
