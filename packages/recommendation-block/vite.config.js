// vite.config.ts

import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      formats: ["es"],
      name: "LyticsRecommendationBlock",
      fileName: (_format) => `lytics-recommendation-block.js`,
    },
    outDir: "dist",
  },
});
