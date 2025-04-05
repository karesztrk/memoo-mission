import { describe, expect, test } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/test/utils/test-utils";
import BoardDeck from "@/components/Board/BoardDeck";

describe("Board deck", () => {
  test("renders empty", async () => {
    renderWithProviders(<BoardDeck />);

    expect(screen.getByLabelText("Game deck")).toBeInTheDocument();
  });

  test("renders main playing elements", async () => {
    const deck = [
      {
        id: 1,
        value: "🐶",
        flipped: false,
        matched: false,
      },
      {
        id: 2,
        value: "🐱",
        flipped: false,
        matched: false,
      },
      {
        id: 3,
        value: "🐭",
        flipped: false,
        matched: false,
      },
    ];

    renderWithProviders(<BoardDeck deck={deck} />);

    expect(screen.getByLabelText("Game deck")).toBeInTheDocument();
    expect(
      screen.getAllByRole("button", { name: "Unflipped card" }).length,
    ).toBe(deck.length);

    for (const card of deck) {
      expect(screen.getByTestId(card.value)).toHaveTextContent("Card back");
    }
  });

  test("renders flipped cards elements", async () => {
    const deck = [
      {
        id: 1,
        value: "🐶",
        flipped: true,
        matched: false,
      },
      {
        id: 2,
        value: "🐱",
        flipped: true,
        matched: false,
      },
      {
        id: 3,
        value: "🐭",
        flipped: false,
        matched: false,
      },
    ];

    const flipped = deck
      .filter((card) => card.flipped)
      .reduce((acc) => acc + 1, 0);

    renderWithProviders(<BoardDeck deck={deck} />);

    expect(screen.getByLabelText("Game deck")).toBeInTheDocument();
    expect(
      screen.getAllByRole("button", { name: "Unflipped card" }).length,
    ).toBe(deck.length - flipped);

    for (const card of deck) {
      expect(screen.getByTestId(card.value)).toHaveTextContent(
        card.flipped ? card.value : "Card back",
      );
    }
  });
});
