import { test, expect } from "./fixtures";

test.describe("Game", () => {
  test("board is set", async ({ page }) => {
    // wait until JS is loaded
    await page.goto("/", { waitUntil: "networkidle" });
    const name = "John Doe";
    const pairs = 6;
    const time = 30;

    await page.getByLabel("Settings").click();

    await page.getByRole("spinbutton", { name: "Number of Pairs" }).fill(pairs.toString());
    await page.getByRole("spinbutton", { name: "Time Limit (seconds)" }).fill(time.toString());
    await page.getByRole("button", { name: "Save settings" }).click();

    await page.getByRole("textbox", { name: "Your Name" }).fill(name);

    await page.getByRole("button", { name: "Start Game" }).click();

    await expect(page.getByText("0 matches")).toBeVisible();
    await expect(page.getByText("0 mistakes")).toBeVisible();
    await expect(page.getByText("100 score")).toBeVisible();
    await expect(page.getByText(`Player: ${name}`)).toBeVisible();
  });
});
