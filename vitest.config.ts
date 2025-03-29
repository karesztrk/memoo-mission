import { getViteConfig } from "astro/config";

export default getViteConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    include: ["**/*.test.[jt]s?(x)"],
    exclude: ["**/node_modules/**", "**/e2e/**"],
    coverage: {
      include: ["src/components/**/*"],
    },
  },
});
