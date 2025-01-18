import { defineConfig } from "vitest/config";
import { loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    build: {
      lib: {
        fileName: "lytics-tracking",
        entry: "src/index.ts",
        name: "MyLib",
      },
      outDir: "dist",
    },
    test: {
      globals: true,
      environment: "happy-dom",
    },
  };
});
