import { describe, expect, test } from "vitest";
import { screen, render } from "@testing-library/react";
import Board from "@/components/Board";

describe("Board", () => {
  test("renders main idle elements", async () => {
    render(<Board />);

    expect(
      screen.getByRole("textbox", { name: "Your Name" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Start Game" }),
    ).toBeInTheDocument();
  });
});
