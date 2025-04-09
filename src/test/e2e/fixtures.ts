import { Game } from "./fixtures/game";
import { test as base } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

interface Fixtures {
  game: Game;
  axe: () => AxeBuilder;
}

export const test = base.extend<Fixtures>({
  game: async ({ page }, use) => {
    const game = new Game(page);
    await use(game);
  },
  axe: async ({ page }, use) => {
    const makeAxeBuilder = () =>
      new AxeBuilder({ page }).withTags([
        "wcag2a",
        "wcag2aa",
        "wcag21a",
        "wcag21aa",
      ]);

    await use(makeAxeBuilder);
  },
});

export { expect } from "@playwright/test";
