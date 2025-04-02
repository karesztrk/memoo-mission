import { describe, expect, test } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/test/utils/test-utils";
import Board from "@/components/Board";

describe("Board", () => {
  test("initial state", async () => {
    renderWithProviders(<Board />);

    expect(screen.getByRole("textbox", { name: "Your Name" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Start Game" })).toBeInTheDocument();
  });
});
