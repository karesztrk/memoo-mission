import { describe, expect, test } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/test/utils/test-utils";
import Settings from "@/components/Settings";

describe("Settings", () => {
  test("default form values", async () => {
    renderWithProviders(<Settings />);

    expect(screen.getByRole("spinbutton", { name: "Number of Pairs" })).toHaveValue(6);
    expect(screen.getByRole("spinbutton", { name: "Time Limit (seconds)" })).toHaveValue(60);
  });
});
