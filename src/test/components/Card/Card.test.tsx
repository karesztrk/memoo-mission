import { describe, expect, test, vitest } from "vitest";
import { render, screen } from "@testing-library/react";
import Card from "@/components/Card";
import userEvent from "@testing-library/user-event";

describe("Card", () => {
  test("callback is triggered", async () => {
    const user = userEvent.setup();
    const onClick = vitest.fn();
    render(<Card onClick={onClick} />);

    await user.click(screen.getByRole("button", { name: "Unflipped card" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test("flipped state", async () => {
    render(<Card flipped />);

    expect(screen.getByRole("button", { name: "Flipped card" })).toBeInTheDocument();
  });
});
