import { describe, expect, test } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/test/utils/test-utils";
import Board from "@/components/Board";

describe("Board", () => {
  const gameState = {
    cards: [],
    countdownTime: 60,
    numberOfPairs: 6,
    timeRemaining: 60,
    elapsedTime: 0,
    status: "idle",
    moves: 0,
    matches: 0,
  };

  const userState = {
    userName: "",
  };

  const cardState = {
    deck: [],
  };

  test("renders main idle elements", async () => {
    renderWithProviders(<Board />);

    expect(
      screen.getByRole("textbox", { name: "Your Name" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Start Game" }),
    ).toBeInTheDocument();
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
    renderWithProviders(<Board />, {
      preloadedState: {
        game: { ...gameState, status: "playing" },
        user: { ...userState },
        card: { ...cardState, deck },
      },
    });

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

    renderWithProviders(<Board />, {
      preloadedState: {
        game: { ...gameState, status: "playing" },
        user: { ...userState },
        card: { ...cardState, deck },
      },
    });

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
