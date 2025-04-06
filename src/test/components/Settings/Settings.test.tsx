import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Settings from "@/components/Settings";

describe("Settings", () => {
  test("default form values", async () => {
    render(<Settings />);

    expect(
      screen.getByRole("spinbutton", { name: "Number of Pairs" }),
    ).toHaveValue(6);
    expect(
      screen.getByRole("spinbutton", { name: "Time Limit (seconds)" }),
    ).toHaveValue(60);
    expect(
      screen.getByRole("spinbutton", { name: "Allowed guesses" }),
    ).toHaveValue(null);
  });
});
