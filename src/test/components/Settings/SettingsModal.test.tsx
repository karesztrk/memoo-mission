import { describe, expect, test, vitest } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/test/utils/test-utils";
import SettingsModal from "@/components/Settings/SettingsModal";
import userEvent from "@testing-library/user-event";

describe("SettingsModal", () => {
  test("closed dialog", async () => {
    renderWithProviders(<SettingsModal />);
    expect(
      screen.getByRole("spinbutton", {
        name: "Number of pair of cards",
        hidden: true,
      }),
    ).not.toBeVisible();
    expect(
      screen.getByRole("spinbutton", {
        name: "Countdown time (sec.)",
        hidden: true,
      }),
    ).not.toBeVisible();
    expect(
      screen.getByRole("spinbutton", { name: "Allowed guesses", hidden: true }),
    ).not.toBeVisible();
  });

  test("light dismiss", async () => {
    const onClose = vitest.fn();
    const user = userEvent.setup();
    renderWithProviders(<SettingsModal open onClose={onClose} />);

    await user.click(screen.getByRole("dialog"));
    expect(onClose).toBeCalledTimes(1);
  });

  test("opened dialog", async () => {
    renderWithProviders(<SettingsModal open />);
    expect(
      screen.getByRole("spinbutton", { name: "Number of pair of cards" }),
    ).toBeVisible();
    expect(
      screen.getByRole("spinbutton", { name: "Countdown time (sec.)" }),
    ).toBeVisible();
    expect(
      screen.getByRole("spinbutton", { name: "Allowed guesses" }),
    ).toBeVisible();

    expect(
      screen.getByRole("dialog", { name: "Game Settings" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "Game Settings" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });

  test("submit settings", async () => {
    const onClose = vitest.fn();
    const user = userEvent.setup();
    const deck = ["A", "B", "C"];
    renderWithProviders(<SettingsModal open onClose={onClose} deck={deck} />);

    await user.click(screen.getByRole("button", { name: "Save settings" }));

    expect(onClose).toBeCalledTimes(1);
  });
});
