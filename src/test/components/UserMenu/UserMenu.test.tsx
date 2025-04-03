import UserMenu from "@/components/UserMenu";
import { renderWithProviders } from "@/test/utils/test-utils";
import { describe, expect, test } from "vitest";
import { screen } from "@testing-library/react";

describe("UserMenu", () => {
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

  test("renders main elements", () => {
    const userName = "John Doe";
    renderWithProviders(<UserMenu />, {
      preloadedState: {
        game: { ...gameState, status: "playing" },
        user: { ...userState, userName },
      },
    });

    expect(screen.getByRole("button", { name: "Settings" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Restart" })).toBeInTheDocument();
    expect(screen.getByText(`Player: ${userName}`)).toBeInTheDocument();
  });
});
