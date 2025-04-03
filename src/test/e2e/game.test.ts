import { test, expect } from "./fixtures";

test.describe("Game", () => {
  test("game settings applied", async ({ page, game }) => {
    // wait until JavaScript is loaded
    await game.open();
    const name = "John Doe";
    const pairs = 6;
    const time = 30;

    await page.getByLabel("Settings", { exact: true }).click();

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
    await game.open();

    await game.start("John Doe");

    const emojis = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊"];

    for (const emoji of emojis) {
      await page.getByTestId(emoji).first().click();
      await page.getByTestId(emoji).nth(1).click();
    }

    await expect(page.getByText("Congratulations! You won!")).toBeVisible();
  });

  test.describe("game loose", () => {
    test("timeout", async ({ page, game }) => {
      await page.clock.install();

      await game.open();

      await game.start("John Doe");

      await page.clock.runFor("30:00"); // Runs the clock for 30 minutes

      await expect(page.getByText("Time's up! Game Over")).toBeVisible();
    });
  });
});
