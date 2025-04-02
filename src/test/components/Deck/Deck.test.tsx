import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Deck from "@/components/Deck";

describe("Deck", () => {
  test("callback is triggered", async () => {
    const text = "Test";
    render(<Deck>{text}</Deck>);

    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
