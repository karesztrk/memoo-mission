import { describe, expect, test } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/test/utils/test-utils";
import Game from "@/components/Game";

describe("Game", () => {
  test("initial state", async () => {
    renderWithProviders(<Game />);

    expect(screen.getByRole("article")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Your Name" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Start Game" })).toBeInTheDocument();
  });
});
