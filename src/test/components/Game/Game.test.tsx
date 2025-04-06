import { describe, expect, test } from "vitest";
import { screen, render } from "@testing-library/react";
import Game from "@/components/Game";

describe("Game", () => {
  test("initial state", async () => {
    render(<Game />);

    expect(screen.getByRole("article")).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: "Your Name" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Start Game" }),
    ).toBeInTheDocument();
  });
});
