import { test, expect } from "./fixtures";

test.describe("Game", () => {
  test("game settings applied", async ({ page, game }) => {
    // wait until JS is loaded
    await page.goto("/", { waitUntil: "networkidle" });
    const name = "John Doe";
    const pairs = 6;
    const time = 30;

    await page.getByLabel("Settings").click();

    await page.getByRole("spinbutton", { name: "Number of Pairs" }).fill(pairs.toString());
    await page.getByRole("spinbutton", { name: "Time Limit (seconds)" }).fill(time.toString());
    await page.getByRole("button", { name: "Save settings" }).click();

    await game.start(name);

    await expect(page.getByText("0 matches")).toBeVisible();
    await expect(page.getByText("0 mistakes")).toBeVisible();
    await expect(page.getByText("100 score")).toBeVisible();
    await expect(page.getByText(`Player: ${name}`)).toBeVisible();
  });

  test("game win", async ({ page, game }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    await game.start("John Doe");

    const emojis = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊"];

    for (const emoji of emojis) {
      await page.getByTestId(emoji).first().click();
      await page.getByTestId(emoji).nth(1).click();
    }

    await expect(page.getByText("Congratulations! You won!")).toBeVisible();
  });
});
