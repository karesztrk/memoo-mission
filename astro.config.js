import { defineConfig } from "astro/config";
import react from "@astrojs/react";

export default defineConfig({
  prefetch: true,
  experimental: {
    svg: true,
  },
  integrations: [react()],
  vite: {
    build: {
      minify: "esbuild",
    },
  },
});
