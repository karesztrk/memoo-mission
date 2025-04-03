import { renderWithProviders } from "@/test/utils/test-utils";
import { describe, expect, test } from "vitest";
import { screen } from "@testing-library/react";
import Stat from "@/components/Stats";

describe("Stats", () => {
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

  test("renders main idle elements", () => {
    const { container } = renderWithProviders(<Stat />);
    expect(container).toBeEmptyDOMElement();
  });

  test("renders main playing elements", () => {
    const userName = "John Doe";
    renderWithProviders(<Stat />, {
      preloadedState: {
        game: { ...gameState, status: "playing" },
        user: { ...userState, userName },
      },
    });

    expect(screen.getByText("1:00")).toBeInTheDocument();
    expect(screen.getByText("0 matches")).toBeInTheDocument();
    expect(screen.getByText("0 mistakes")).toBeInTheDocument();
    expect(screen.getByText("100 score")).toBeInTheDocument();
  });
});
