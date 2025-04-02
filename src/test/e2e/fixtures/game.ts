import { type Page } from "@playwright/test";

export class Game {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async start(name: string): Promise<void> {
    await this.page.getByRole("textbox", { name: "Your Name" }).fill(name);
    await this.page.getByRole("button", { name: "Start Game" }).click();
  }
}
