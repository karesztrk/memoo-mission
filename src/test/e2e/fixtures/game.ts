import type { Page } from "@playwright/test";

export class Game {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async open() {
    // wait until JavaScript is loaded
    await this.page.goto("/", { waitUntil: "networkidle" });
  }

  async start(name: string): Promise<void> {
    await this.page.getByRole("textbox", { name: "Your Name" }).fill(name);
    await this.page.getByRole("button", { name: "Start Game" }).click();
  }

  async openSettings() {
    await this.page.getByLabel("Settings", { exact: true }).click();
  }

  async fillSettings({
    pairs,
    time,
    allowed,
  }: {
    pairs: number;
    time: number;
    allowed?: number;
  }) {
    await this.page
      .getByRole("spinbutton", { name: "Number of pair of cards" })
      .fill(pairs.toString());
    await this.page
      .getByRole("spinbutton", { name: "Countdown time (sec.)" })
      .fill(time.toString());
    if (allowed !== undefined) {
      await this.page
        .getByRole("spinbutton", { name: "Allowed guesses" })
        .fill(allowed.toString());
    }
  }

  async submitSettings() {
    await this.page.getByRole("button", { name: "Save settings" }).click();
  }
}
