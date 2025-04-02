import { Game } from "./fixtures/game";
import { test as base } from "@playwright/test";

interface Fixtures {
  game: Game;
}

export const test = base.extend<Fixtures>({
  game: async ({ page }, use) => {
    const game = new Game(page);
    await use(game);
  },
});

export { expect } from "@playwright/test";
