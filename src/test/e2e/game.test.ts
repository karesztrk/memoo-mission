import { test, expect } from "./fixtures";

test.describe("Game", () => {
  test("board is set", async ({ page }) => {
    // wait until JS is loaded
    await page.goto("/", { waitUntil: "networkidle" });
    const name = "John Doe";
    const pairs = 6;
    const time = 30;

    await page.getByRole("textbox", { name: "Your Name" }).fill(name);
    await page.getByRole("spinbutton", { name: "Number of Pairs" }).fill(pairs.toString());
    await page.getByRole("spinbutton", { name: "Time Limit (seconds)" }).fill(time.toString());

    const startButton = page.getByRole("button", { name: "Start Game" });
    await startButton.click();

    await expect(page.getByText(`Player: ${name}`)).toBeVisible();

    const regexp = new RegExp(`Matches: 0 / ${pairs}`);
    await expect(page.getByText(regexp)).toBeVisible();
    await expect(page.getByText("Mistakes: 0")).toBeVisible();
  });
});
