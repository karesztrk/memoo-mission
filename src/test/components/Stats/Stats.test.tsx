import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Stat from "@/components/Stats";
import { allowedMovesAtom, statusAtom } from "@/store/gameStore";
import { userAtom } from "@/store/userStore";

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
    const { container } = render(<Stat />);
    expect(container).toBeEmptyDOMElement();
  });

  test("renders main playing elements", () => {
    const userName = "John Doe";
    statusAtom.set("playing");
    userAtom.set(userName);

    render(<Stat />);

    expect(screen.getByText("1:00")).toBeInTheDocument();
    expect(screen.getByText("0 matches")).toBeInTheDocument();
    expect(screen.getByText("0 mistakes")).toBeInTheDocument();
    expect(screen.getByText("100 score")).toBeInTheDocument();
  });

  test("renders allowed guesses", () => {
    const userName = "John Doe";
    const allowed = 10;
    statusAtom.set("playing");
    userAtom.set(userName);
    allowedMovesAtom.set(allowed);

    render(<Stat />);

    expect(screen.getByText("1:00")).toBeInTheDocument();
    expect(screen.getByText("0 matches")).toBeInTheDocument();
    expect(screen.getByText("0 mistakes")).toBeInTheDocument();
    expect(screen.getByText("100 score")).toBeInTheDocument();
    const regex = new RegExp(`0/${allowed} guess`);
    expect(screen.getByText(regex)).toBeInTheDocument();
  });
});
