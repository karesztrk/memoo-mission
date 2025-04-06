import { describe, expect, test } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/test/utils/test-utils";
import Settings from "@/components/Settings";

describe("Settings", () => {
  test("default form values", async () => {
    renderWithProviders(<Settings />);

    expect(
      screen.getByRole("spinbutton", { name: "Number of pair of cards" }),
    ).toHaveValue(6);
    expect(
      screen.getByRole("spinbutton", { name: "Countdown time (sec.)" }),
    ).toHaveValue(60);
    expect(
      screen.getByRole("spinbutton", { name: "Allowed guesses" }),
    ).toHaveValue(null);
  });
});
