import { defineConfig } from "astro/config";
import react from "@astrojs/react";

export default defineConfig({
  experimental: {
    svg: true,
  },
  integrations: [react()],
});
