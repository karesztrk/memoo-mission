import { test, expect } from "./fixtures";

test.describe("Index page", () => {
  test("Logo navigation", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: "Memoo Mission" }).click();
  });

  test("Footer info is rendered", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByText("Károly Török ©")).toBeVisible();
  });
});
